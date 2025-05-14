import mongoose from 'mongoose'

const VacanciesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    services: [String],
    position: Number,
})

export const Vacancies = mongoose.model('Vacancies', VacanciesSchema);

const VacanciesFAQSchema = new mongoose.Schema({
    faq: [
        {
            question: String,
            answer: String,
        },
    ],
}, { timestamps: true })

export const VacanciesFAQ = mongoose.model('VacanciesFAQ', VacanciesFAQSchema)

const VacanciesReviewSchema = new mongoose.Schema({
    image: String,
    date: Date,
    name: String,
    role: String,
    advantages: String,
    disadvantages: String,
    position: Number,
}, { timestamps: true })

export const VacanciesReview = mongoose.model('VacanciesReview', VacanciesReviewSchema)


const VacanciesPhotosSchema = new mongoose.Schema({
    image: String,
    position: Number, // ← добавлено
}, { timestamps: true })

export const VacanciesPhotos = mongoose.model('VacanciesPhotos', VacanciesPhotosSchema)