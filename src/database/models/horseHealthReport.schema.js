import { Schema, model } from "mongoose";

// تقرير صحة الخيل - إجمالي لكل التقارير السابقة
const horseHealthReportSchema = new Schema({
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
    // عدد الخيول
    total_horses: {
        type: Number,
        required: true,
        min: 0
    },
    
    young_horses: {
        type: Number,
        default: 0,
        min: 0
    },
    
    female_horses: {
        type: Number,
        default: 0,
        min: 0
    },
    
    // الفحص الصحي
    health_check_type: {
        type: String,
        required: true,
        enum: ['Routine Check', 'Vaccination', 'Treatment', 'Parasite Control', 'Emergency', 'Complete Health Assessment']
    },
    
    // حالة الخيول
    health_status: {
        type: String,
        enum: ['Healthy', 'Sick', 'Under Treatment', 'Quarantine'],
        default: 'Healthy'
    },
    
    // التشخيص (إن وجد)
    diagnosis: {
        type: String
    },
    
    // العلاج المقدم (إن وجد)
    treatment_provided: {
        type: String
    },
    
    // التطعيمات (إن وجدت)
    vaccinations_given: [{
        vaccine_name: String,
        quantity: Number,
        batch_number: String
    }],
    
    // مكافحة الطفيليات (إن وجدت)
    parasite_control: {
        applied: {
            type: Boolean,
            default: false
        },
        treatment_type: String,
        quantity: Number
    },
    
    // الفحوصات المخبرية (إن وجدت)
    lab_tests: [{
        test_type: String,
        sample_code: String,
        result: String
    }],
    
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
        default: 'Horse Health'
    },
    
    // ملاحظات
    remarks: { 
        type: String
    }
}, { timestamps: true });

export const HorseHealthReport = model('HorseHealthReport', horseHealthReportSchema);
