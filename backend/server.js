import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import formidableMiddleware from 'express-formidable'
import { ComponentLoader } from 'adminjs'

import { User } from './model/User.js'
import { Article } from './model/Article.js'
import { ServicePage } from './model/ServicePage.js'
import {ServiceCategory} from "./model/ServiceCategory.js";
import { ContactInfo } from './model/ContactInfo.js'
import { IndexClient, IndexAdvantage, IndexReview, IndexKeyNumber,IndexCase } from './model/Index.js'
import { About } from "./model/About.js";
import { PartnershipFAQ } from './model/PartnershipFAQ.js';

import { ContactInfoResource } from './admin-resources/contact-info.resource.js'
import { ServicePageResource } from './admin-resources/servicePage.resource.js'
import { serviceCategoryResource } from './admin-resources/serviceCategory.resource.js';
import { ArticleResource } from './admin-resources/article.resource.js'
import { aboutResource } from './admin-resources/about.resource.js';
import { IndexPageResources } from './admin-resources/index.resource.js'
import { partnershipFAQResource } from './admin-resources/partnership-faq.resource.js';

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const componentLoader = new ComponentLoader()

await mongoose.connect(process.env.MONGO_URI)

AdminJS.registerAdapter({ Database, Resource })

const app = express()

// 📦 Обработка multipart/form-data
app.use(formidableMiddleware({
  uploadDir: path.join(__dirname, 'public/uploads'),
  keepExtensions: true,
  maxFileSize: 10 * 1024 * 1024, // 10MB
}))

// 📁 Статика
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))

// 🛠️ AdminJS конфиг
const admin = new AdminJS({
  resources: [
      { resource: User },
    ContactInfoResource,
    ...IndexPageResources(componentLoader), // ← подключаем ресурсы
    ArticleResource(componentLoader),
    ServicePageResource,
    serviceCategoryResource,
    aboutResource,
    partnershipFAQResource
  ],
  rootPath: '/admin',
  componentLoader, // ← обязателен с uploadFeature
})

await admin.initialize(); // обязательно!

// 🔐 Авторизация
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) return null
    const bcrypt = await import('bcrypt')
    const isValid = await bcrypt.compare(password, user.password)
    return isValid ? user : null
  },
  cookieName: 'adminjs',
  cookiePassword: process.env.COOKIE_SECRET || 'supersecretcookievalue',
})

app.use(admin.options.rootPath, adminRouter)

app.get('/api/articles', async (req, res) => {
  const articles = await Article.find({}, 'title slug image intro date') // ← только нужные поля
      .sort({ date: -1 }) // по дате, последние сверху
      .limit(100)         // можно ограничить
  res.json(articles)
})

// 📘 Отдача статьи по slug
app.get('/api/articles/:slug', async (req, res) => {
  const { slug } = req.params
  const article = await Article.findOne({ slug })
  if (!article) return res.status(404).json({ error: 'Статья не найдена' })

  // Получаем предыдущую статью (созданную раньше)
  const prev = await Article.findOne({
    createdAt: { $lt: article.createdAt },
  })
      .sort({ createdAt: -1 }) // ближайшая по времени назад
      .select('slug title')

  // Получаем следующую статью (созданную позже)
  const next = await Article.findOne({
    createdAt: { $gt: article.createdAt },
  })
      .sort({ createdAt: 1 }) // ближайшая по времени вперёд
      .select('slug title')

  res.json({
    ...article.toObject(),
    prev,
    next,
  })

})


app.get('/api/index', async (req, res) => {
  try {
    const keyNumbers = await IndexKeyNumber.find()
    const advantages = await IndexAdvantage.find()
    const clients = await IndexClient.find()
    const reviews = await IndexReview.find()
    const cases = await IndexCase.find()

    res.json({
      keyNumbers,
      advantages,
      clients,
      reviews,
      cases,
    })
  } catch (e) {
    console.error('Ошибка при загрузке /api/index:', e)
    res.status(500).json({ error: 'Ошибка при загрузке данных' })
  }
})


// ⬆️ Ручная загрузка (если понадобится)
app.post('/api/upload', (req, res) => {
  const file = req.files?.file
  if (!file) return res.status(400).json({ error: 'Файл не найден' })

  const fileName = `${Date.now()}-${file.name}`
  const newPath = path.join(__dirname, 'public/uploads', fileName)

  fs.rename(file.path, newPath, err => {
    if (err) return res.status(500).json({ error: 'Ошибка при сохранении файла' })
    res.json({ url: `/uploads/${fileName}` })
  })
})

app.get('/api/contact', async (req, res) => {
  const contact = await ContactInfo.findOne().sort({ createdAt: -1 })
  res.json(contact)
})

app.get('/api/services/:slug', async (req, res) => {
  const { slug } = req.params
  try {
    const page = await ServicePage.findOne({ slug })
    if (!page) return res.status(404).json({ error: 'Услуга не найдена' })
    res.json(page)
  } catch (err) {
    console.error('Ошибка при получении услуги:', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})


app.get('/api/service-categories', async (req, reply) => {
  const categories = await ServiceCategory.find({}).populate('services');
  reply.send(categories);
});

app.get('/api/service-categories/:slug', async (req, reply) => {
  const category = await ServiceCategory.findOne({ slug: req.params.slug, showPage: true }).populate('services');
  if (!category) return reply.code(404).send({ error: 'Not found' });
  reply.send(category);
});

app.get('/api/about', async (req, reply) => {
  const about = await About.findOne().sort({ updatedAt: -1 });
  if (!about) {
    return reply.code(404).send({ error: 'Not found' });
  }
  return reply.send(about);
});

app.get('/api/partnership-faq', async (req, reply) => {
  const faq = await PartnershipFAQ.findOne().sort({ updatedAt: -1 });
  if (!faq) {
    return reply.code(404).send({ error: 'Not found' });
  }
  return reply.send(faq);
});

// 🚀 Запуск сервера
app.listen(5050, () => {
  console.log('🚀 AdminJS доступен по адресу http://localhost:5050/admin')
})

await admin.initialize(); // обязательно!
admin.watch()