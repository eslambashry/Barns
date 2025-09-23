const mongoose = require('mongoose');
const { Schema } = mongoose;

// مخطط فرعي لمعلومات القطيع
const herdInfoSchema = new Schema({
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
    total_horse: { type: Number, default: 0 }, // إضافة الخيول
    // الحقول المجمعة يمكن حسابها عند الحاجة أو تخزينها
    total_herd: { type: Number, default: 0 },
    total_young: { type: Number, default: 0 },
    total_female: { type: Number, default: 0 },
    total_treated: { type: Number, default: 0 },
}, { _id: false });

// مخطط فرعي لحالة الحظائر
const animalBarnsSchema = new Schema({
    is_treated: { type: Boolean, default: false },
    area_sqm: { type: Number },
    insecticide_used: { type: String },
    quantity: { type: Number }
}, { _id: false });

const reportSchema = new Schema({
    serial_no: { // رقم تسلسلي للتقرير
        type: String,
        unique: true,
        required: true
    },
    service_request: {
        type: Schema.Types.ObjectId,
        ref: 'ServiceRequest',
        required: true
    },
    team: { // الفريق الذي قام بالعمل
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    report_date: {
        type: Date,
        required: true
    },
    // --- الأقسام المدمجة ---
    herd_information: herdInfoSchema,
    
    // حقول عامة لكل التقارير
    breeding_status: { type: String },
    herd_health_status: { type: String }, // e.g., 'Healthy'
    complying_to_instructions: { type: Boolean },
    animals_handling: { type: String }, // e.g., 'Easy handling'
    labours_availability: { type: String }, // e.g., 'Available'
    location_reachability: { type: String }, // e.g., 'Easy'

    // حقول متغيرة حسب نوع التقرير
    report_details: {
        type: Schema.Types.Mixed, // يسمح بتخزين أي نوع من البيانات (JSON)
        required: true
    },
    
    notes: { // ملاحظات عامة
        type: String
    }
}, { timestamps: true });

/*
مثال على ما يمكن تخزينه في `report_details`
// For Treatment
{
  "diagnosis": "No Diseases",
  "intervention_category": "Clinical Examination",
  "treatment": "Iphadimidine 100% 500 gm"
}

// For Parasite Control
{
  "requirement_fulfilled": true,
  "insecticide_used": "اسم المبيد",
  "quantity": 10.5,
  "category": "parasite control activity",
  "animal_barns": animalBarnsSchema
}

// For Vaccination
{
  "requirement_fulfilled": true,
  "vaccines_used": ["HS", "SG-Pox", "ET"],
  "total_vaccinated": 150
}
*/

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
