import { Schema, model } from "mongoose";

// مخطط فرعي لمعلومات الحيوانات
const animalCountSchema = new Schema({
    sheep: { type: Number, default: 0 },
    goats: { type: Number, default: 0 },
    camel: { type: Number, default: 0 },
    horse: { type: Number, default: 0 },
    cattle: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
}, { _id: false });

const treatmentReportSchema = new Schema({
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
    
    // عدد الحيوانات
    animal_count: {
        type: animalCountSchema,
        required: true
    },
    
    // معلومات العلاج
    diagnosis: {
        type: String,
        required: true
    },
    
    intervention_category: {
        type: String,
        required: true,
        enum: ['Clinical Examination', 'Emergency Treatment', 'Routine Check', 'Mass Treatment', 'Surgical Intervention', 'Other']
    },
    
    treatment: {
        type: String,
        required: true
    },
    
    // عدد الحيوانات المعالجة
    treated_count: {
        type: Number,
        required: true,
        min: 0
    },
    
    // ملاحظات العلاج (كيف تم العلاج)
    treatment_notes: {
        type: String
    },
    
    // معلومات الطلب
    request_date: {
        type: Date,
        required: true
    },
    
    request_status: {
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
        default: 'm clinic treatment'
    },
    
    // ملاحظات عامة
    remarks: { 
        type: String
    }
}, { timestamps: true });

// يمكن تكرار نفس المربي أكثر من مرة في نفس اليوم
// لذلك لا نضع unique constraint على (client + report_date)

export const TreatmentReport = model('TreatmentReport', treatmentReportSchema);
