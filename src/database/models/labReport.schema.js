import { Schema, model } from "mongoose";

const labReportSchema = new Schema({
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
    
    // معلومات الطبيب الذي أخذ العينة
    veterinarian_name: {
        type: String,
        required: true
    },
    
    // معلومات العينة
    sample_code: {
        type: String,
        required: true,
        unique: true
    },
    
    animal_type: {
        type: String,
        required: true,
        enum: ['Sheep', 'Goat', 'Camel', 'Horse', 'Cattle', 'Other']
    },
    
    sample_type: {
        type: String,
        required: true,
        enum: ['Blood', 'Urine', 'Feces', 'Tissue', 'Swab', 'Milk', 'Other']
    },
    
    // صلاحية العينة للفحص
    sample_valid_for_testing: {
        type: Boolean,
        required: true,
        default: true
    },
    
    // نتيجة الفحص
    test_result: {
        type: String,
        required: true
    },
    
    // التشخيص
    diagnosis: {
        type: String,
        required: true
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
        default: 'Lab Test'
    },
    
    // ملاحظات
    remarks: { 
        type: String
    }
}, { timestamps: true });

export const LabReport = model('LabReport', labReportSchema);
