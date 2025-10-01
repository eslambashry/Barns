import { Schema, model } from "mongoose";

const teamSchema = new Schema({
    supervisor: {
        type: Schema.Types.ObjectId,
        ref: 'User', // ربط بالمشرف
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department', // ربط بالقسم
        required: true
    },
    vehicle_no: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Team = model('Team', teamSchema);

