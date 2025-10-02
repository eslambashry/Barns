# أمثلة Requests - إضافة المربيين (حسب Frontend)

## 📝 إضافة مربي جديد

### مثال 1: مربي مع حيوانات

```http
POST http://localhost:3000/clients/add
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "أحمد محمد علي السعيد",
  "national_id": "1234567890",
  "birth_date": "1980-05-15",
  "phone": "0501234567",
  "email": "ahmed@example.com",
  "village": "قرية النور",
  "detailed_address": "حي الزهور، شارع الملك فيصل، منزل رقم 25",
  "status": "نشط",
  "animals": [
    {
      "animal_type": "أغنام",
      "breed": "نجدي",
      "age": 2,
      "gender": "أنثى",
      "health_status": "سليم",
      "identification_number": "SH-001"
    },
    {
      "animal_type": "أغنام",
      "breed": "نجدي",
      "age": 3,
      "gender": "ذكر",
      "health_status": "سليم",
      "identification_number": "SH-002"
    },
    {
      "animal_type": "ماعز",
      "breed": "عارضي",
      "age": 1,
      "gender": "أنثى",
      "health_status": "سليم",
      "identification_number": "GT-001"
    }
  ],
  "available_services": [
    "Parasite Control",
    "Vaccination",
    "Treatment & Monitoring"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم إضافة المربي بنجاح",
  "data": {
    "_id": "67890clientId123",
    "name": "أحمد محمد علي السعيد",
    "national_id": "1234567890",
    "birth_date": "1980-05-15T00:00:00.000Z",
    "phone": "0501234567",
    "email": "ahmed@example.com",
    "village": "قرية النور",
    "detailed_address": "حي الزهور، شارع الملك فيصل، منزل رقم 25",
    "status": "نشط",
    "animals": [
      {
        "_id": "animal1Id",
        "animal_type": "أغنام",
        "breed": "نجدي",
        "age": 2,
        "gender": "أنثى",
        "health_status": "سليم",
        "identification_number": "SH-001",
        "createdAt": "2025-10-01T19:00:00.000Z",
        "updatedAt": "2025-10-01T19:00:00.000Z"
      },
      {
        "_id": "animal2Id",
        "animal_type": "أغنام",
        "breed": "نجدي",
        "age": 3,
        "gender": "ذكر",
        "health_status": "سليم",
        "identification_number": "SH-002",
        "createdAt": "2025-10-01T19:00:00.000Z",
        "updatedAt": "2025-10-01T19:00:00.000Z"
      },
      {
        "_id": "animal3Id",
        "animal_type": "ماعز",
        "breed": "عارضي",
        "age": 1,
        "gender": "أنثى",
        "health_status": "سليم",
        "identification_number": "GT-001",
        "createdAt": "2025-10-01T19:00:00.000Z",
        "updatedAt": "2025-10-01T19:00:00.000Z"
      }
    ],
    "available_services": [
      "Parasite Control",
      "Vaccination",
      "Treatment & Monitoring"
    ],
    "createdAt": "2025-10-01T19:00:00.000Z",
    "updatedAt": "2025-10-01T19:00:00.000Z"
  }
}
```

---

### مثال 2: مربي بدون حيوانات (سيتم إضافتها لاحقاً)

```http
POST http://localhost:3000/clients/add
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "محمد عبدالله الأحمد",
  "national_id": "9876543210",
  "birth_date": "1975-08-20",
  "phone": "0509876543",
  "email": "mohammed@example.com",
  "village": "قرية السلام",
  "detailed_address": "حي الربيع، شارع الأمير سلطان",
  "status": "نشط",
  "animals": [],
  "available_services": [
    "Parasite Control",
    "Vaccination",
    "Treatment & Monitoring",
    "Lab Test",
    "Horse Health"
  ]
}
```

---

### مثال 3: مربي إبل

```http
POST http://localhost:3000/clients/add
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "سعد بن فهد القحطاني",
  "national_id": "5555555555",
  "birth_date": "1970-12-10",
  "phone": "0505555555",
  "village": "قرية الخير",
  "detailed_address": "مزرعة الإبل الكبرى",
  "status": "نشط",
  "animals": [
    {
      "animal_type": "إبل",
      "breed": "مجاهيم",
      "age": 5,
      "gender": "أنثى",
      "health_status": "سليم",
      "identification_number": "CM-001"
    },
    {
      "animal_type": "إبل",
      "breed": "مجاهيم",
      "age": 7,
      "gender": "ذكر",
      "health_status": "سليم",
      "identification_number": "CM-002"
    },
    {
      "animal_type": "إبل",
      "breed": "صفر",
      "age": 3,
      "gender": "أنثى",
      "health_status": "سليم",
      "identification_number": "CM-003"
    }
  ],
  "available_services": [
    "Parasite Control",
    "Vaccination",
    "Treatment & Monitoring",
    "Lab Test"
  ]
}
```

---

### مثال 4: مربي خيول

```http
POST http://localhost:3000/clients/add
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "خالد بن عبدالعزيز",
  "national_id": "7777777777",
  "birth_date": "1985-03-25",
  "phone": "0507777777",
  "email": "khaled@example.com",
  "village": "قرية الفردوس",
  "detailed_address": "مزرعة الخيول العربية الأصيلة",
  "status": "نشط",
  "animals": [
    {
      "animal_type": "خيول",
      "breed": "عربي أصيل",
      "age": 4,
      "gender": "ذكر",
      "health_status": "سليم",
      "identification_number": "HR-001"
    },
    {
      "animal_type": "خيول",
      "breed": "عربي أصيل",
      "age": 3,
      "gender": "أنثى",
      "health_status": "سليم",
      "identification_number": "HR-002"
    }
  ],
  "available_services": [
    "Horse Health",
    "Vaccination",
    "Treatment & Monitoring"
  ]
}
```

---

### مثال 5: مربي قطيع مختلط

```http
POST http://localhost:3000/clients/add
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "عبدالرحمن بن سعود",
  "national_id": "3333333333",
  "birth_date": "1978-11-05",
  "phone": "0503333333",
  "village": "قرية الرحمة",
  "detailed_address": "مزرعة الوادي الأخضر",
  "status": "نشط",
  "animals": [
    {
      "animal_type": "أغنام",
      "breed": "نجدي",
      "age": 2,
      "gender": "أنثى",
      "health_status": "سليم",
      "identification_number": "SH-101"
    },
    {
      "animal_type": "أغنام",
      "breed": "نجدي",
      "age": 1,
      "gender": "أنثى",
      "health_status": "سليم",
      "identification_number": "SH-102"
    },
    {
      "animal_type": "ماعز",
      "breed": "عارضي",
      "age": 2,
      "gender": "ذكر",
      "health_status": "سليم",
      "identification_number": "GT-101"
    },
    {
      "animal_type": "أبقار",
      "breed": "هولشتاين",
      "age": 3,
      "gender": "أنثى",
      "health_status": "سليم",
      "identification_number": "CT-101"
    },
    {
      "animal_type": "إبل",
      "breed": "مجاهيم",
      "age": 5,
      "gender": "أنثى",
      "health_status": "سليم",
      "identification_number": "CM-101"
    }
  ],
  "available_services": [
    "Parasite Control",
    "Vaccination",
    "Treatment & Monitoring",
    "Lab Test"
  ]
}
```

---

## 🔄 إضافة حيوان لمربي موجود

```http
POST http://localhost:3000/clients/:clientId/add-animal
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "animal_type": "أغنام",
  "breed": "نجدي",
  "age": 1,
  "gender": "أنثى",
  "health_status": "سليم",
  "identification_number": "SH-NEW-001"
}
```

---

## 📊 الاستعلامات

### 1. البحث بالقرية

```http
GET http://localhost:3000/clients/search?village=قرية النور
Authorization: Bearer YOUR_TOKEN_HERE
```

### 2. البحث بالاسم

```http
GET http://localhost:3000/clients/search?name=أحمد
Authorization: Bearer YOUR_TOKEN_HERE
```

### 3. البحث بالحالة

```http
GET http://localhost:3000/clients/filter?status=نشط
Authorization: Bearer YOUR_TOKEN_HERE
```

### 4. الحصول على مربيين قرية معينة

```http
GET http://localhost:3000/clients/by-village/قرية النور
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 🔄 التحديث

### تحديث بيانات المربي

```http
PUT http://localhost:3000/clients/:clientId
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "phone": "0509999999",
  "email": "newemail@example.com",
  "detailed_address": "عنوان جديد محدث",
  "status": "غير نشط"
}
```

### تحديث حيوان

```http
PUT http://localhost:3000/clients/:clientId/animals/:animalId
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "health_status": "تحت العلاج",
  "age": 3
}
```

---

## 🗑️ الحذف

### حذف حيوان

```http
DELETE http://localhost:3000/clients/:clientId/animals/:animalId
Authorization: Bearer YOUR_TOKEN_HERE
```

### حذف مربي

```http
DELETE http://localhost:3000/clients/:clientId
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📋 القرى المتاحة

```
- قرية النور
- قرية السلام
- قرية الأمل
- قرية الخير
- قرية الفردوس
- قرية الرحمة
- قرية البركة
```

## 🐑 أنواع الحيوانات

```
- أغنام
- ماعز
- أبقار
- إبل
- خيول
```

## 💊 الحالات الصحية

```
- سليم
- مريض
- تحت العلاج
```

## 👤 الحالات

```
- نشط
- غير نشط
```

---

## ⚠️ ملاحظات مهمة

1. **الحقول المطلوبة:**
   - الاسم الكامل
   - رقم الهوية (فريد)
   - رقم الهاتف
   - القرية

2. **الحقول الاختيارية:**
   - تاريخ الميلاد
   - البريد الإلكتروني
   - العنوان التفصيلي
   - قائمة الحيوانات

3. **القرية:**
   - يجب اختيار قرية واحدة من القائمة المحددة
   - لا يمكن إضافة قرى جديدة إلا من قبل الإدارة

4. **الحيوانات:**
   - يمكن إضافة الحيوانات عند إنشاء المربي
   - يمكن إضافة حيوانات لاحقاً
   - كل حيوان له رقم تعريف فريد (اختياري)

5. **الحالة الافتراضية:**
   - نشط (عند الإنشاء)
