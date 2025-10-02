import { Schema, model } from "mongoose";

// مخطط فرعي لمعلومات القطيع
const herdInfoSchema = new Schema({
    total_sheep: { type: Number, default: 0 },
    young_sheep: { type: Number, default: 0 },
    female_sheep: { type: Number, default: 0 },
    treated_sheep: { type: Number, default: 0 },
    
    total_goats: { type: Number, default: 0 },
    young_goats: { type: Number, default: 0 },
    female_goats: { type: Number, default: 0 },
    treated_goats: { type: Number, default: 0 },
    
    total_camel: { type: Number, default: 0 },
    young_camels: { type: Number, default: 0 },
    female_camels: { type: Number, default: 0 },
    treated_camels: { type: Number, default: 0 },
    
    total_cattle: { type: Number, default: 0 },
    young_cattle: { type: Number, default: 0 },
    female_cattle: { type: Number, default: 0 },
    treated_cattle: { type: Number, default: 0 },
    
    // الحقول المجمعة
    total_herd: { type: Number, default: 0 },
    total_young: { type: Number, default: 0 },
    total_female: { type: Number, default: 0 },
    total_treated: { type: Number, default: 0 }
}, { _id: false });

// مخطط فرعي لمعلومات الحظائر
const animalBarnsSchema = new Schema({
    is_treated: { 
        type: Boolean, 
        default: false 
    },
    area_sqm: { 
        type: Number,
        min: 0
    },
    insecticide_type: { 
        type: String 
    },
    insecticide_quantity: { 
        type: Number,
        min: 0
    }
}, { _id: false });

// مخطط فرعي للمبيدات المستخدمة
const insecticideUsedSchema = new Schema({
    type: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true,
        min: 0
    }
}, { _id: false });

const parasiteControlReportSchema = new Schema({
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
    
    // معلومات المبيدات المستخدمة
    insecticides_used: [insecticideUsedSchema],
    
    // معلومات الحظائر
    animal_barns: animalBarnsSchema,
    
    // حالة القطيع
    breeding_status: { 
        type: String 
    },
    herd_health_status: { 
        type: String,
        enum: ['Healthy', 'Sick', 'Under Treatment', 'Quarantine'],
        default: 'Healthy'
    },
    complying_to_instructions: { 
        type: Boolean,
        default: true
    },
    
    // متطلبات مكافحة الطفيليات
    parasite_control_requirement_fulfilled: {
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
        default: 'Parasite Control Activity'
    },
    
    // ملاحظات
    remarks: { 
        type: String
    }
}, { timestamps: true });

export const ParasiteControlReport = model('ParasiteControlReport', parasiteControlReportSchema);
