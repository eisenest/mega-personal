// models/IndexKeyNumber.js
import mongoose from 'mongoose'

const IndexKeyNumberSchema = new mongoose.Schema({
    number: String,
    description: String,
}, { timestamps: true })

export const IndexKeyNumber = mongoose.model('IndexKeyNumber', IndexKeyNumberSchema)

// models/IndexAdvantage.js
const IndexAdvantageSchema = new mongoose.Schema({
    image: String,
    thesis: [String],
}, { timestamps: true })

export const IndexAdvantage = mongoose.model('IndexAdvantage', IndexAdvantageSchema)

// models/IndexClient.js
const IndexClientSchema = new mongoose.Schema({
    image: String,
    url: String,
}, { timestamps: true })

export const IndexClient = mongoose.model('IndexClient', IndexClientSchema)

// models/IndexReview.js
const IndexReviewSchema = new mongoose.Schema({
    image: String,
    company: String,
    person: String,
    role: String,
    text: String,
}, { timestamps: true })

export const IndexReview = mongoose.model('IndexReview', IndexReviewSchema)

// models/IndexCase.js
const IndexCaseSchema = new mongoose.Schema({
    title: String,
    task: String,
    decision: String,
    summary: String,
}, { timestamps: true })

export const IndexCase = mongoose.model('IndexCase', IndexCaseSchema)