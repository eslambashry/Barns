import { Schema, model } from "mongoose";

// مخطط فرعي لمعلومات القطيع
const herdInfoSchema = new Schema({
    total_sheep: { type: Number, default: 0 },
    young_sheep: { type: Number, default: 0 },
    female_sheep: { type: Number, default: 0 },
    vaccinated_sheep: { type: Number, default: 0 },
    
    total_goats: { type: Number, default: 0 },
    young_goats: { type: Number, default: 0 },
    female_goats: { type: Number, default: 0 },
    vaccinated_goats: { type: Number, default: 0 },
    
    total_camel: { type: Number, default: 0 },
    young_camels: { type: Number, default: 0 },
    female_camels: { type: Number, default: 0 },
    vaccinated_camels: { type: Number, default: 0 },
    
    total_cattle: { type: Number, default: 0 },
    young_cattle: { type: Number, default: 0 },
    female_cattle: { type: Number, default: 0 },
    vaccinated_cattle: { type: Number, default: 0 },
    
    // الحقول المجمعة
    total_herd: { type: Number, default: 0 },
    total_young: { type: Number, default: 0 },
    total_female: { type: Number, default: 0 },
    total_vaccinated: { type: Number, default: 0 }
}, { _id: false });

// مخطط فرعي للقاحات المستخدمة
const vaccineUsedSchema = new Schema({
    vaccine_name: { 
        type: String, 
        required: true,
        enum: ['HS', 'SG-Pox', 'ET', 'FMD', 'PPR', 'Anthrax', 'Rabies', 'Other']
    },
    quantity: { 
        type: Number, 
        required: true,
        min: 0
    },
    batch_number: {
        type: String
    }
}, { _id: false });

const vaccinationReportSchema = new Schema({
    serial_no: { 
        type: String,
        unique: true,
        required: true
    },
    service_request: {
        type: Schema.Types.ObjectId,
        ref: 'ServiceRequest',
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    team: { 
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    report_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    
    // معلومات القطيع
    herd_information: {
        type: herdInfoSchema,
        required: true
    },
    
    // اللقاحات المستخدمة
    vaccines_used: [vaccineUsedSchema],
    
    // حالة القطيع
    herd_health_status: { 
        type: String,
        enum: ['Healthy', 'Sick', 'Under Treatment', 'Quarantine'],
        default: 'Healthy'
    },
    
    // سهولة التعامل مع الحيوانات
    animals_handling: {
        type: String,
        enum: ['Easy handling', 'Moderate', 'Difficult'],
        default: 'Easy handling'
    },
    
    // توفر العمالة
    labours: {
        type: String,
        enum: ['Available', 'Limited', 'Not Available'],
        default: 'Available'
    },
    
    // سهولة الوصول للموقع
    reachable_location: {
        type: String,
        enum: ['Easy', 'Moderate', 'Difficult'],
        default: 'Easy'
    },
    
    // متطلبات التطعيم
    vaccination_requirement_fulfilled: {
        type: Boolean,
        default: false
    },
    
    // معلومات الطلب
    request_situation: {
        type: String,
        enum: ['Open', 'In-Progress', 'Closed', 'Cancelled'],
        default: 'Open'
    },
    request_fulfilling_date: {
        type: Date
    },
    
    // الفئة
    category: {
        type: String,
        default: 'Vaccination'
    },
    
    // ملاحظات
    remarks: { 
        type: String
    }
}, { timestamps: true });

export const VaccinationReport = model('VaccinationReport', vaccinationReportSchema);
