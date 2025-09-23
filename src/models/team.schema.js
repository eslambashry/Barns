const mongoose = require('mongoose');
const { Schema } = mongoose;

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

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
