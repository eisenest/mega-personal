import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/mongoose'
import { User } from './model/User.js'
import { Article } from './model/Article.js'
import { ArticleResource } from './admin-resources/article.resource.js'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import formidableMiddleware from 'express-formidable'
import { ComponentLoader } from 'adminjs'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 📦 componentLoader нужен для @adminjs/upload 4.x+
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
    ArticleResource(componentLoader),
  ],
  rootPath: '/admin',
  componentLoader, // ← обязателен с uploadFeature
})

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

// 📘 Отдача статьи по slug
app.get('/api/articles/:slug', async (req, res) => {
  const { slug } = req.params
  const article = await Article.findOne({ slug })
  if (!article) return res.status(404).json({ error: 'Статья не найдена' })
  res.json(article)
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

// 🚀 Запуск сервера
app.listen(5050, () => {
  console.log('🚀 AdminJS доступен по адресу http://localhost:5050/admin')
})
