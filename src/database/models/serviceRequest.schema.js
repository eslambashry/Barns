import { Schema, model } from "mongoose";

const serviceRequestSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    village: { 
        type: Schema.Types.ObjectId,
        required: true
    },
    request_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Open', 'In-Progress', 'Closed', 'Cancelled'],
        default: 'Open'
    },
    fulfilling_date: {
        type: Date
    },
    category: {
        type: String,
        required: true,
        enum: ['Parasite Control', 'Vaccination', 'm clinic treatment', 'Lab Test', 'Horse Health Check']
    },
    remarks: { // ملاحظات
        type: String
    }
}, { timestamps: true });

export const ServiceRequest = model('ServiceRequest', serviceRequestSchema);
