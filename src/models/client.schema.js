const mongoose = require('mongoose');
const { Schema } = mongoose;

// مخطط فرعي لمواقع العميل (القرى)
const villageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    n_coordinate: {
        type: Number
    },
    e_coordinate: {
        type: Number
    }
});

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    // لا يوجد ID منفصل حسب طلبك، MongoDB يوفر _id تلقائياً
    birth_date: {
        type: Date
    },
    phone: {
        type: String
    },
    villages: {
        type: [villageSchema], // مصفوفة من القرى المدمجة
        validate: [
            {
                validator: function(v) {
                    // التحقق من أن عدد المواقع لا يتجاوز 3
                    return v.length <= 3;
                },
                message: 'لا يمكن للمربي إضافة أكثر من 3 مواقع'
            },
            {
                validator: function(v) {
                    // التحقق من عدم تكرار اسم القرية لنفس العميل
                    const names = v.map(village => village.name);
                    return new Set(names).size === names.length;
                },
                message: 'لا يمكن تسجيل نفس القرية مرتين لنفس المربي'
            }
        ]
    }
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
