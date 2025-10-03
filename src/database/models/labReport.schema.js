import { Schema, model } from "mongoose";

const labReportSchema = new Schema({
    serial_no: { 
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    sample_code: {
        type: String,
        required: true,
        unique: true
    },
    // Owner Information
    owner_name: { type: String, required: true },
    owner_id: { type: String, required: true },
    owner_birthdate: { type: Date },
    owner_phone: { type: String, required: true },
    
    // Location
    location: { type: String, required: true },
    coordinate_n: { type: Number },
    coordinate_e: { type: Number },
    
    // Animal Counts
    total_sheep: { type: Number, default: 0 },
    total_goats: { type: Number, default: 0 },
    total_camel: { type: Number, default: 0 },
    total_horse: { type: Number, default: 0 },
    total_cattle: { type: Number, default: 0 },
    other_species: { type: String },
    
    // Sample Information
    sample_collector: { type: String, required: true },
    sample_type: { type: String, required: true },
    samples_number: { type: Number, default: 1 },
    positive_cases: { type: Number, default: 0 },
    negative_cases: { type: Number, default: 0 },
    
    remarks: { type: String }
}, { timestamps: true });

export const LabReport = model('LabReport', labReportSchema);
