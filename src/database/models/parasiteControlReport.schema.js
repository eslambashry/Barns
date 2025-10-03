import { Schema, model } from "mongoose";

const parasiteControlReportSchema = new Schema({
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
    owner_name: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    },
    owner_birthdate: {
        type: Date
    },
    owner_phone: {
        type: String,
        required: true
    },
    // Location
    herd_location: {
        type: String,
        required: true
    },
    coordinate_e: {
        type: Number
    },
    coordinate_n: {
        type: Number
    },
    // Team Info
    supervisor: {
        type: String,
        required: true
    },
    vehicle_no: {
        type: String,
        required: true
    },
    // Herd Numbers
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
    
    // Totals
    total_herd: { type: Number, default: 0 },
    total_young: { type: Number, default: 0 },
    total_female: { type: Number, default: 0 },
    total_treated: { type: Number, default: 0 },
    
    // Insecticide Information
    insecticide_type: { type: String },
    insecticide_volume_ml: { type: Number, default: 0 },
    insecticide_category: { type: String },
    insecticide_status: { type: String },
    
    // Animal Barns
    animal_barn_size_sqm: { type: Number, default: 0 },
    breeding_sites: { type: String },
    parasite_control_volume: { type: Number, default: 0 },
    parasite_control_status: { type: String },
    
    // Health & Compliance
    herd_health_status: { type: String },
    complying_to_instructions: { type: Boolean, default: true },
    
    // Request Information
    request_date: { type: Date },
    request_situation: { type: String },
    request_fulfilling_date: { type: Date },
    
    remarks: { type: String }
}, { timestamps: true });

export const ParasiteControlReport = model('ParasiteControlReport', parasiteControlReportSchema);
