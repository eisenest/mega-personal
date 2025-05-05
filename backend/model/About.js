import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
    keyNumber: [
        {
            number: String,
            description: String,
        }
    ],
    services: [String]

}, { timestamps: true })

export const About = mongoose.model('About', AboutSchema)
