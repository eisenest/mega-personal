// model/ContactInfo.js
import mongoose from 'mongoose'

const ContactInfoSchema = new mongoose.Schema({
    email: String,
    address: String,
    devPhone: String,
    receptionPhone: String,
    applicantPhone: String,
    workingHours: String,
    legalInfo: String,
    mapEmbedUrl: String, // для iframe-карты
}, { timestamps: true })

export const ContactInfo = mongoose.model('ContactInfo', ContactInfoSchema)
