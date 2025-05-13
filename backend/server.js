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
import cors from 'cors'
import uploadFeature from '@adminjs/upload'

import { User } from './model/User.js'
import { Article } from './model/Article.js'
import { ServicePage } from './model/ServicePage.js'
import {ServiceCategory} from "./model/ServiceCategory.js";
import { ContactInfo } from './model/ContactInfo.js'
import { IndexClient, IndexAdvantage, IndexReview, IndexKeyNumber,IndexCase } from './model/Index.js'
import { About } from "./model/About.js";
import { PartnershipFAQ } from './model/PartnershipFAQ.js';
import { vacanciesResources } from './admin-resources/vacancies.resource.js'
import { Vacancies, VacanciesFAQ, VacanciesReview, VacanciesPhotos } from './model/Vacancies.js'

import { ContactInfoResource } from './admin-resources/contact-info.resource.js'
import { ServicePageResource } from './admin-resources/servicePage.resource.js'
import { serviceCategoryResource } from './admin-resources/serviceCategory.resource.js';
import { ArticleResource } from './admin-resources/article.resource.js'
import { aboutResource } from './admin-resources/about.resource.js';
import { IndexPageResources } from './admin-resources/index.resource.js'
import { partnershipFAQResource } from './admin-resources/partnership-faq.resource.js';
import { bundle } from '@adminjs/bundler';

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const componentLoader = new ComponentLoader()
const uploadEditComponentPath = path.join(__dirname, 'admin-components/ImageUploadEditComponent.jsx')
componentLoader.add('ImageUploadEditComponent', uploadEditComponentPath)

// await bundle({
//     componentLoader,
//     destinationDir: 'public/assets', // relative to CWD
//     adminJsAssetsDir: 'public/assets2'
//   })



// await mongoose.connect(process.env.MONGO_URI)

await mongoose.connect('mongodb://mega-root-admin-personal:sEcV55Od_G@mongo:27017/megapersonal?authSource=megapersonal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

AdminJS.registerAdapter({ Database, Resource })

const app = express()

const allowedOrigins = [
  'http://localhost:3000',
  'http://89.169.2.131',
  'http://89.169.2.131:5050',
  'http://89.169.2.131:3000',
  'http://localhost:5050'
]


app.use(cors({
  origin: (origin, callback) => {
    // Разрешаем запросы без origin (например, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))

// 📦 Обработка multipart/form-data
app.use(formidableMiddleware({
  uploadDir: path.join(__dirname, 'public/uploads'),
  keepExtensions: true,
  maxFileSize: 10 * 1024 * 1024, // 10MB
}))

// 📁 Статика
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))

app.use('/admin/frontend/assets/components.bundle.js', express.static(path.join(__dirname, 'public/assets/components.bundle.js')))


// 🛠️ AdminJS конфиг
const admin = new AdminJS({
  resources: [
      { resource: User },
    ...IndexPageResources(componentLoader), // ← подключаем ресурсы
    ...vacanciesResources(componentLoader),
    serviceCategoryResource,
    ServicePageResource(componentLoader),
    partnershipFAQResource,
    aboutResource,
    ArticleResource(componentLoader),
    ContactInfoResource,
  ],
  rootPath: '/admin',
  componentLoader, // ← обязателен с uploadFeature
})

try {
  await admin.initialize()
  console.log('[adminjs] initialized successfully')
} catch (err) {
  console.error('[adminjs] failed to initialize:', err)
}

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

// отдача собранного бандла
app.use('/admin/frontend/assets', express.static(path.join(__dirname, 'admin-bundle')))

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

app.get('/api/vacancies', async (req, res) => {
  try {
    const vacancies = await Vacancies.find()
    const faq = await VacanciesFAQ.findOne().sort({ updatedAt: -1 })
    const reviews = await VacanciesReview.find().sort({ date: -1 })
    const photos = await VacanciesPhotos.find().sort({ updatedAt: -1 })

    res.json({
      vacancies,
      faq: faq?.faq || [],
      reviews,
      photos,
    })
  } catch (err) {
    console.error('Ошибка /api/vacancies:', err)
    res.status(500).json({ error: 'Ошибка при получении данных' })
  }
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
  const dir = req.fields?.dir || '' // ← express-formidable кладёт это в req.fields

  if (!file) return res.status(400).json({ error: 'Файл не найден' })

  const sanitizedDir = dir.replace(/[^a-zA-Z0-9_-]/g, '') // защита от инъекций
  const fileName = `${Date.now()}-${file.name}`
  const uploadPath = path.join(__dirname, 'public/uploads', sanitizedDir)
  const newPath = path.join(uploadPath, fileName)

  fs.mkdir(uploadPath, { recursive: true }, (err) => {
    if (err) return res.status(500).json({ error: 'Ошибка при создании папки' })

    fs.rename(file.path, newPath, err => {
      if (err) return res.status(500).json({ error: 'Ошибка при сохранении файла' })

      res.json({ url: `/uploads/${sanitizedDir}/${fileName}` })
    })
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


app.get('/api/service-categories', async (req, res) => {
  const categories = await ServiceCategory.find({}).populate('services');
  res.json(categories);
});

app.get('/api/service-categories/:slug', async (req, res) => {
  const category = await ServiceCategory.findOne({ slug: req.params.slug, showPage: true }).populate('services');
  if (!category) return res.status(404).json({ error: 'Not found' });
  res.json(category);
});

app.get('/api/about', async (req, res) => {
  const about = await About.findOne().sort({ updatedAt: -1 });
  if (!about) {
    return res.status(404).json({ error: 'Not found' });
  }
  return res.json(about);
});

app.get('/api/partnership-faq', async (req, res) => {
  const faq = await PartnershipFAQ.findOne().sort({ updatedAt: -1 });
  if (!faq) {
    return res.status(404).json({ error: 'Not found' });
  }
  return res.json(faq);
});

// 🚀 Запуск сервера
app.listen(5050, () => {
  console.log('🚀 AdminJS доступен по адресу http://localhost:5050/admin')
})

// admin.watch()