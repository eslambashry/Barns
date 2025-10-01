import { Schema, model } from "mongoose";

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

export const Department = model('Department', departmentSchema);
