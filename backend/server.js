import dotenv from 'dotenv'
import Fastify from 'fastify'
import AdminJS from 'adminjs'
import AdminJSFastify from '@adminjs/fastify'
import mongoose from 'mongoose'
import { Database, Resource } from '@adminjs/mongoose'
import { User } from './model/User.js'

dotenv.config()

const fastify = Fastify({ logger: true })

await mongoose.connect(process.env.MONGO_URI)

AdminJS.registerAdapter({ Database, Resource })

const admin = new AdminJS({
  resources: [User],
  rootPath: '/admin',
})

await AdminJSFastify.buildAuthenticatedRouter(admin, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) return null
    const bcrypt = await import('bcrypt')
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return null
    return user
  },
  cookieName: 'adminjs',
  cookiePassword: process.env.COOKIE_SECRET || 'secret',
}, fastify)


fastify.listen({ port: 5050, host: '0.0.0.0' }, () => {
  console.log('🚀 AdminJS running at http://localhost:3000/admin')
})
