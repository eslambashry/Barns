import { Schema, model } from "mongoose";

const teamMemberSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        enum: ['Supervisor', 'Veterinarian', 'Assistant', 'Driver'],
        required: true
    }
}, { _id: false });

const teamSchema = new Schema({
    team_name: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department', // ربط بالقسم
        required: true
    },
    // الفريق مسؤول عن عميل معين (اختياري - يمكن أن يكون الفريق عام)
    assigned_client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    // القرية/الموقع المسؤول عنه (اختياري)
    assigned_village: {
        type: String
    },
    // أعضاء الفريق
    team_members: [teamMemberSchema],
    // المشرف الرئيسي للفريق
    supervisor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vehicle_no: {
        type: String,
        required: true
    },
    // حالة الفريق
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'On Leave'],
        default: 'Active'
    },
    // ملاحظات
    notes: {
        type: String
    }
}, { timestamps: true });

// Index للبحث السريع
teamSchema.index({ department: 1, assigned_client: 1 });
teamSchema.index({ department: 1, status: 1 });

export const Team = model('Team', teamSchema);

