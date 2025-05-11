// models/ServicePage.js
import mongoose from 'mongoose'

const ServicePageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    metaTitle: String,
    metaDescription: String,
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    hero: {
        title: String,
        subtitle: String,
        buttonText: String,
    },

    problems: {
        type: [
            {
                title: String,
                description: String,
            },
        ],
        validate: [arr => arr.length <= 6, 'Максимум 6 проблем'],
    },

    employees: [
        {
            title: String,
            positions: [String],
        },
    ],

    advantages: [
        {
            title: String,
            description: String,
        },
    ],

    mission: {
        text: String,
    },

    missionCards: [
        {
            title: String,
            description: String,
        },
    ],

    recruitmentSteps: [
        {
            title: String,
            description: String,
        },
    ],

    resultSteps: [String],

    faq: [
        {
            question: String,
            answer: String,
        },
    ],
}, { timestamps: true })

export const ServicePage = mongoose.model('ServicePage', ServicePageSchema)
