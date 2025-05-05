// models/ServiceCategory.ts
import mongoose from 'mongoose';

const ServiceCategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    showPage: { type: Boolean, default: true },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ServicePage' }],
});

export const ServiceCategory = mongoose.model('ServiceCategory', ServiceCategorySchema);
