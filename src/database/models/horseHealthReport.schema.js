import { Schema, model } from "mongoose";

const horseHealthReportSchema = new Schema({
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
    // Owner Information
    owner_name: { type: String, required: true },
    owner_id: { type: String, required: true },
    owner_birthdate: { type: Date },
    owner_phone: { type: String, required: true },
    
    // Location
    farm_location: { type: String, required: true },
    coordinate_n: { type: Number },
    coordinate_e: { type: Number },
    
    // Treatment Information
    diagnosis: { type: String, required: true },
    intervention_category: { type: String, required: true },
    treatment: { type: String, required: true },
    
    // Request Information
    request_date: { type: Date },
    request_status: { type: String },
    request_fulfilling_date: { type: Date },
    
    remarks: { type: String }
}, { timestamps: true });

export const HorseHealthReport = model('HorseHealthReport', horseHealthReportSchema);
