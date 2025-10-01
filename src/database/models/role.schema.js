import { Schema, model } from "mongoose";

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: [
            'super_admin',
            'parasite_control_supervisor',
            'vaccination_supervisor',
            'treatment_supervisor',
            'lab_supervisor',
            'horse_health_supervisor',
            'team_member' 
        ]
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Role = model('Role', roleSchema);
