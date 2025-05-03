// backend/seed.js
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from './model/User.js'

dotenv.config()

async function seed() {
    await mongoose.connect(process.env.MONGO_URI)

    // Удалим старых пользователей (по желанию)
    await User.deleteMany({})

    // Создадим нового
    await User.create({
        email: 'admin@example.com',
        password: 'admin', // будет автоматически захеширован через pre-save
    })

    console.log('✅ Admin user created: admin@example.com / admin')
}

seed().catch(err => {
    console.error('❌ Seeding error:', err)
    process.exit(1)
})
