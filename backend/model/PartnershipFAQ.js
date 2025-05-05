import mongoose from 'mongoose'

const PartnershipFAQSchema = new mongoose.Schema({
    faq: [
        {
            question: String,
            answer: String,
        },
    ],
}, { timestamps: true })

export const PartnershipFAQ = mongoose.model('PartnershipFAQ', PartnershipFAQSchema)
