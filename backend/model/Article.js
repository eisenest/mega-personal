import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // для URL
    image: String,
    date: Date,
    intro: String,
    content: String, // сюда будем сохранять HTML или Markdown
}, { timestamps: true })

export const Article = mongoose.model('Article', ArticleSchema)
