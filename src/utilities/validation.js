// دوال التحقق من صحة البيانات

// التحقق من صحة الهوية الوطنية السعودية
export const validateSaudiNationalId = (nationalId) => {
    if (!nationalId || typeof nationalId !== 'string') {
        return false;
    }
    
    // يجب أن تكون 10 أرقام
    if (nationalId.length !== 10) {
        return false;
    }
    
    // يجب أن تكون أرقام فقط
    if (!/^\d+$/.test(nationalId)) {
        return false;
    }
    
    // يجب أن تبدأ بـ 1 أو 2
    if (!nationalId.startsWith('1') && !nationalId.startsWith('2')) {
        return false;
    }
    
    return true;
};

// التحقق من صحة رقم الجوال السعودي
export const validateSaudiPhone = (phone) => {
    if (!phone || typeof phone !== 'string') {
        return false;
    }
    
    // إزالة المسافات والرموز
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    // يجب أن يبدأ بـ 05 ويكون 10 أرقام
    // أو يبدأ بـ +9665 أو 9665 ويكون 13 أو 12 رقم
    const saudiPhoneRegex = /^(05\d{8}|(\+?966)?5\d{8})$/;
    
    return saudiPhoneRegex.test(cleanPhone);
};

// التحقق من صحة الإحداثيات
export const validateCoordinates = (latitude, longitude) => {
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        return false;
    }
    
    // نطاق الإحداثيات للمملكة العربية السعودية تقريباً
    // خط العرض: 16 إلى 33
    // خط الطول: 34 إلى 56
    if (latitude < 16 || latitude > 33) {
        return false;
    }
    
    if (longitude < 34 || longitude > 56) {
        return false;
    }
    
    return true;
};

// التحقق من صحة التاريخ
export const validateDate = (date) => {
    if (!date) {
        return false;
    }
    
    const dateObj = new Date(date);
    
    // التحقق من أن التاريخ صالح
    if (isNaN(dateObj.getTime())) {
        return false;
    }
    
    return true;
};

// التحقق من أن التاريخ في الماضي
export const isDateInPast = (date) => {
    const dateObj = new Date(date);
    const now = new Date();
    
    return dateObj < now;
};

// التحقق من أن التاريخ في المستقبل
export const isDateInFuture = (date) => {
    const dateObj = new Date(date);
    const now = new Date();
    
    return dateObj > now;
};

// التحقق من صحة البريد الإلكتروني
export const validateEmail = (email) => {
    if (!email || typeof email !== 'string') {
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// التحقق من قوة كلمة المرور
export const validatePasswordStrength = (password) => {
    if (!password || typeof password !== 'string') {
        return {
            isValid: false,
            message: 'كلمة المرور مطلوبة'
        };
    }
    
    if (password.length < 8) {
        return {
            isValid: false,
            message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'
        };
    }
    
    // يجب أن تحتوي على حرف كبير وحرف صغير ورقم
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
        return {
            isValid: false,
            message: 'كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم'
        };
    }
    
    return {
        isValid: true,
        message: 'كلمة المرور قوية'
    };
};

// التحقق من صحة الرقم التسلسلي
export const validateSerialNumber = (serialNo, prefix) => {
    if (!serialNo || typeof serialNo !== 'string') {
        return false;
    }
    
    // يجب أن يبدأ بالبادئة المحددة
    if (prefix && !serialNo.startsWith(prefix)) {
        return false;
    }
    
    return true;
};

// التحقق من صحة الكمية
export const validateQuantity = (quantity) => {
    if (typeof quantity !== 'number') {
        return false;
    }
    
    if (quantity < 0) {
        return false;
    }
    
    return true;
};

// التحقق من صحة عدد الحيوانات
export const validateAnimalCount = (count) => {
    if (typeof count !== 'number') {
        return false;
    }
    
    if (count < 0 || !Number.isInteger(count)) {
        return false;
    }
    
    return true;
};

// دالة مساعدة للتحقق من وجود الحقول المطلوبة
export const validateRequiredFields = (data, requiredFields) => {
    const missingFields = [];
    
    for (const field of requiredFields) {
        if (!data[field] && data[field] !== 0 && data[field] !== false) {
            missingFields.push(field);
        }
    }
    
    if (missingFields.length > 0) {
        return {
            isValid: false,
            message: `الحقول التالية مطلوبة: ${missingFields.join(', ')}`
        };
    }
    
    return {
        isValid: true
    };
};

// التحقق من صحة بيانات المربي
export const validateClientData = (clientData) => {
    const errors = [];
    
    // التحقق من الحقول المطلوبة
    const requiredCheck = validateRequiredFields(clientData, ['name', 'national_id', 'phone']);
    if (!requiredCheck.isValid) {
        errors.push(requiredCheck.message);
    }
    
    // التحقق من الهوية الوطنية
    if (clientData.national_id && !validateSaudiNationalId(clientData.national_id)) {
        errors.push('الهوية الوطنية غير صحيحة');
    }
    
    // التحقق من رقم الجوال
    if (clientData.phone && !validateSaudiPhone(clientData.phone)) {
        errors.push('رقم الجوال غير صحيح');
    }
    
    // التحقق من تاريخ الميلاد
    if (clientData.birth_date) {
        if (!validateDate(clientData.birth_date)) {
            errors.push('تاريخ الميلاد غير صحيح');
        } else if (!isDateInPast(clientData.birth_date)) {
            errors.push('تاريخ الميلاد يجب أن يكون في الماضي');
        }
    }
    
    // التحقق من القرى
    if (clientData.villages && Array.isArray(clientData.villages)) {
        if (clientData.villages.length > 3) {
            errors.push('لا يمكن إضافة أكثر من 3 مواقع');
        }
        
        clientData.villages.forEach((village, index) => {
            if (!village.name) {
                errors.push(`اسم القرية ${index + 1} مطلوب`);
            }
            
            if (village.n_coordinate && village.e_coordinate) {
                if (!validateCoordinates(village.n_coordinate, village.e_coordinate)) {
                    errors.push(`إحداثيات القرية ${index + 1} غير صحيحة`);
                }
            }
        });
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

export default {
    validateSaudiNationalId,
    validateSaudiPhone,
    validateCoordinates,
    validateDate,
    isDateInPast,
    isDateInFuture,
    validateEmail,
    validatePasswordStrength,
    validateSerialNumber,
    validateQuantity,
    validateAnimalCount,
    validateRequiredFields,
    validateClientData
};
