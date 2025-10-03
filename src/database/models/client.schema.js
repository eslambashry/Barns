import { Schema, model } from "mongoose";


const clientSchema = new Schema({
    // المعلومات الشخصية
    name: {
        type: String,
        required: true,
        trim: true
    },
    national_id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    birth_date: {
        type: Date
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    village: {
        type: String,
        required: true,
        enum: [
            'قرية النور',
            'قرية السلام',
            'قرية الأمل',
            'قرية الخير',
            'قرية الفردوس',
            'قرية الرحمة',
            'قرية البركة'
        ]
    },
    longitude: {
        type: Number,
        min: -180,
        max: 180
    },
    latitude: {
        type: Number,
        min: -90,
        max: 90
    },
    // العنوان التفصيلي
    detailed_address: {
        type: String,
        trim: true
    },
    available_services: [{
        type: String,
        enum: ['Parasite Control', 'Vaccination', 'Treatment & Monitoring', 'Lab Test', 'Horse Health']
    }]
}, { timestamps: true });

export const Client = model('Client', clientSchema);
