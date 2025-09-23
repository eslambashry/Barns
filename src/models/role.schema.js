const mongoose = require('mongoose');
const { Schema } = mongoose;

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
            'team_member' // دور عام لأعضاء الفريق إذا احتجت
        ]
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
