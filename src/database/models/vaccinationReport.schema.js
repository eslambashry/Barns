import { Schema, model } from "mongoose";

const vaccinationReportSchema = new Schema({
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
    coordinate_e: { type: Number },
    coordinate_n: { type: Number },
    
    // Team Info
    supervisor: { type: String, required: true },
    team: { type: String, required: true },
    
    // Herd Numbers
    total_sheep: { type: Number, default: 0 },
    female_sheep: { type: Number, default: 0 },
    vaccinated_sheep: { type: Number, default: 0 },
    
    total_goats: { type: Number, default: 0 },
    female_goats: { type: Number, default: 0 },
    vaccinated_goats: { type: Number, default: 0 },
    
    total_camel: { type: Number, default: 0 },
    female_camel: { type: Number, default: 0 },
    vaccinated_camel: { type: Number, default: 0 },
    
    total_cattle: { type: Number, default: 0 },
    female_cattle: { type: Number, default: 0 },
    vaccinated_cattle: { type: Number, default: 0 },
    
    // Totals
    herd_number: { type: Number, default: 0 },
    herd_females: { type: Number, default: 0 },
    total_vaccinated: { type: Number, default: 0 },
    
    // Status
    herd_health: { type: String },
    animal_handling: { type: String },
    labours: { type: String },
    reachable_location: { type: String },
    
    // Request Information
    request_date: { type: Date },
    request_situation: { type: String },
    request_fulfilling_date: { type: Date },
    
    // Vaccine Information
    vaccine_type: { type: String },
    vaccine_category: { type: String },
    
    remarks: { type: String }
}, { timestamps: true });

export const VaccinationReport = model('VaccinationReport', vaccinationReportSchema);
