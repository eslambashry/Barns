const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        maxlength: 1 // الرمز عبارة عن حرف واحد
    }
});

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;
