import { Schema, model } from "mongoose";

// مخطط فرعي للحيوانات
const animalSchema = new Schema({
    animal_type: {
        type: String,
        required: true,
        enum: ['أغنام', 'ماعز', 'أبقار', 'إبل', 'خيول']
    },
    breed: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        min: 0
    },
    gender: {
        type: String,
        enum: ['ذكر', 'أنثى'],
        required: true
    },
    health_status: {
        type: String,
        enum: ['سليم', 'مريض', 'تحت العلاج'],
        default: 'سليم'
    },
    identification_number: {
        type: String,
        trim: true
    }
}, { _id: true, timestamps: true });

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
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    // القرية - اختيار واحد من القائمة
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
    // العنوان التفصيلي
    detailed_address: {
        type: String,
        trim: true
    },
    // الحالة
    status: {
        type: String,
        enum: ['نشط', 'غير نشط'],
        default: 'نشط'
    },
    // قائمة الحيوانات
    animals: [animalSchema],
    // الخدمات المتاحة للعميل (بدون أسعار)
    available_services: [{
        type: String,
        enum: ['Parasite Control', 'Vaccination', 'Treatment & Monitoring', 'Lab Test', 'Horse Health']
    }]
}, { timestamps: true });

// Index للبحث السريع (national_id already has unique index from schema)
clientSchema.index({ village: 1 });
clientSchema.index({ status: 1 });
clientSchema.index({ name: 1 }); // Changed from text to regular index for better performance

export const Client = model('Client', clientSchema);
