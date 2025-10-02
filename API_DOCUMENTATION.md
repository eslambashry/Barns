# توثيق API - نظام إدارة الخدمات البيطرية

## جدول المحتويات
1. [المصادقة (Authentication)](#المصادقة-authentication)
2. [المربيين (Clients)](#المربيين-clients)
3. [مكافحة الطفيليات (Parasite Control)](#مكافحة-الطفيليات-parasite-control)
4. [التطعيم (Vaccination)](#التطعيم-vaccination)
5. [المراقبة والعلاج (Treatment)](#المراقبة-والعلاج-treatment)
6. [المختبرات (Laboratory)](#المختبرات-laboratory)
7. [صحة الخيول (Horse Health)](#صحة-الخيول-horse-health)

---

## المصادقة (Authentication)

### تسجيل الدخول
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@barns.com",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "name": "Super Admin",
    "email": "admin@barns.com",
    "role": "super_admin"
  }
}
```

**ملاحظة:** استخدم الـ token في جميع الطلبات التالية في الـ Header:
```
Authorization: Bearer <token>
```

---

## المربيين (Clients)

### 1. إضافة مربي جديد
```http
POST /clients/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "أحمد محمد علي",
  "national_id": "1234567890",
  "birth_date": "1980-01-15",
  "phone": "0501234567",
  "villages": [
    {
      "name": "القرية الشمالية",
      "n_coordinate": 26.738551,
      "e_coordinate": 37.840469
    }
  ]
}
```

### 2. رفع عدد كبير من المربيين (Bulk Upload)
```http
POST /clients/bulk-upload
Authorization: Bearer <token>
Content-Type: application/json

{
  "clients": [
    {
      "name": "مربي 1",
      "national_id": "1111111111",
      "birth_date": "1975-05-20",
      "phone": "0501111111",
      "villages": [
        {
          "name": "قرية 1",
          "n_coordinate": 26.5,
          "e_coordinate": 37.5
        }
      ]
    },
    {
      "name": "مربي 2",
      "national_id": "2222222222",
      "birth_date": "1982-08-10",
      "phone": "0502222222",
      "villages": [
        {
          "name": "قرية 2",
          "n_coordinate": 26.6,
          "e_coordinate": 37.6
        }
      ]
    }
  ]
}
```

### 3. إضافة قرية للمربي
```http
POST /clients/:clientId/add-village
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "القرية الجنوبية",
  "n_coordinate": 26.123456,
  "e_coordinate": 37.654321
}
```

### 4. إضافة خدمة للمربي
```http
POST /clients/:clientId/add-service
Authorization: Bearer <token>
Content-Type: application/json

{
  "service": "Parasite Control"
}
```

**الخدمات المتاحة:**
- `Parasite Control`
- `Vaccination`
- `Treatment & Monitoring`
- `Lab Test`
- `Horse Health`

### 5. الحصول على جميع المربيين
```http
GET /clients
Authorization: Bearer <token>
```

### 6. البحث عن مربيين
```http
GET /clients/search?village=القرية&name=أحمد
Authorization: Bearer <token>
```

**Query Parameters:**
- `village` (optional): اسم القرية
- `name` (optional): اسم المربي

### 7. الحصول على مربي واحد
```http
GET /clients/:clientId
Authorization: Bearer <token>
```

### 8. تحديث بيانات المربي
```http
PUT /clients/:clientId
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "أحمد محمد علي المحدث",
  "phone": "0509999999"
}
```

### 9. حذف مربي
```http
DELETE /clients/:clientId
Authorization: Bearer <token>
```

---

## مكافحة الطفيليات (Parasite Control)

### 1. إنشاء تقرير جديد
```http
POST /parasite-control/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "serial_no": "PC-2025-001",
  "service_request": "serviceRequestId",
  "client": "clientId",
  "team": "teamId",
  "report_date": "2025-10-01",
  "herd_information": {
    "total_sheep": 150,
    "young_sheep": 30,
    "female_sheep": 90,
    "treated_sheep": 145,
    "total_goats": 80,
    "young_goats": 15,
    "female_goats": 50,
    "treated_goats": 75,
    "total_camel": 20,
    "young_camels": 5,
    "female_camels": 12,
    "treated_camels": 18,
    "total_cattle": 10,
    "young_cattle": 2,
    "female_cattle": 6,
    "treated_cattle": 10
  },
  "insecticides_used": [
    {
      "type": "مبيد الحشرات A",
      "category": "فئة 1",
      "quantity": 15.5
    },
    {
      "type": "مبيد الحشرات B",
      "category": "فئة 2",
      "quantity": 10
    }
  ],
  "animal_barns": {
    "is_treated": true,
    "area_sqm": 500,
    "insecticide_type": "مبيد الحظائر",
    "insecticide_quantity": 25
  },
  "breeding_status": "جيد",
  "herd_health_status": "Healthy",
  "complying_to_instructions": true,
  "parasite_control_requirement_fulfilled": true,
  "request_situation": "Closed",
  "request_fulfilling_date": "2025-10-01",
  "remarks": "تم العلاج بنجاح والقطيع في حالة صحية جيدة"
}
```

### 2. الحصول على جميع التقارير
```http
GET /parasite-control
Authorization: Bearer <token>
```

### 3. الحصول على إحصائيات
```http
GET /parasite-control/stats?startDate=2025-09-01&endDate=2025-10-01
Authorization: Bearer <token>
```

**Query Parameters:**
- `startDate` (optional): تاريخ البداية
- `endDate` (optional): تاريخ النهاية

**Response:**
```json
{
  "success": true,
  "data": {
    "totalClients": 45,
    "totalReports": 120,
    "totalTreated": 5680
  }
}
```

### 4. فلترة التقارير
```http
GET /parasite-control/filter?startDate=2025-09-01&endDate=2025-10-01&clientId=clientId
Authorization: Bearer <token>
```

### 5. الحصول على تقرير واحد
```http
GET /parasite-control/:reportId
Authorization: Bearer <token>
```

### 6. تحديث تقرير
```http
PUT /parasite-control/:reportId
Authorization: Bearer <token>
Content-Type: application/json

{
  "remarks": "تحديث الملاحظات",
  "request_situation": "Closed"
}
```

### 7. حذف تقرير
```http
DELETE /parasite-control/:reportId
Authorization: Bearer <token>
```

---

## التطعيم (Vaccination)

### 1. إنشاء تقرير تطعيم
```http
POST /vaccination/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "serial_no": "VAC-2025-001",
  "service_request": "serviceRequestId",
  "client": "clientId",
  "team": "teamId",
  "report_date": "2025-10-01",
  "herd_information": {
    "total_sheep": 150,
    "young_sheep": 30,
    "female_sheep": 90,
    "vaccinated_sheep": 148,
    "total_goats": 80,
    "young_goats": 15,
    "female_goats": 50,
    "vaccinated_goats": 78
  },
  "vaccines_used": [
    {
      "vaccine_name": "HS",
      "quantity": 150,
      "batch_number": "HS-2025-001"
    },
    {
      "vaccine_name": "SG-Pox",
      "quantity": 80,
      "batch_number": "SGP-2025-002"
    },
    {
      "vaccine_name": "ET",
      "quantity": 100,
      "batch_number": "ET-2025-003"
    }
  ],
  "herd_health_status": "Healthy",
  "animals_handling": "Easy handling",
  "labours": "Available",
  "reachable_location": "Easy",
  "vaccination_requirement_fulfilled": true,
  "request_situation": "Closed",
  "request_fulfilling_date": "2025-10-01",
  "remarks": "تم التطعيم بنجاح"
}
```

**اللقاحات المتاحة:**
- `HS` - Hemorrhagic Septicemia
- `SG-Pox` - Sheep & Goat Pox
- `ET` - Enterotoxemia
- `FMD` - Foot and Mouth Disease
- `PPR` - Peste des Petits Ruminants
- `Anthrax`
- `Rabies`
- `Other`

### 2-7. نفس endpoints مكافحة الطفيليات
```http
GET /vaccination
GET /vaccination/stats
GET /vaccination/filter
GET /vaccination/:reportId
PUT /vaccination/:reportId
DELETE /vaccination/:reportId
```

---

## المراقبة والعلاج (Treatment)

### 1. إنشاء تقرير علاج
```http
POST /treatment/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "serial_no": "TRT-2025-001",
  "service_request": "serviceRequestId",
  "client": "clientId",
  "team": "teamId",
  "report_date": "2025-10-01",
  "animal_count": {
    "sheep": 0,
    "goats": 0,
    "camel": 160,
    "horse": 0,
    "cattle": 0
  },
  "diagnosis": "No Diseases",
  "intervention_category": "Clinical Examination",
  "treatment": "Iphadimidine 100% 500 gm",
  "treated_count": 160,
  "treatment_notes": "تم الفحص السريري وإعطاء العلاج الوقائي",
  "request_date": "2025-09-12",
  "request_status": "Closed",
  "request_fulfilling_date": "2025-10-01",
  "remarks": "علاج جماعي - Mass Treatment"
}
```

**فئات التدخل المتاحة:**
- `Clinical Examination`
- `Emergency Treatment`
- `Routine Check`
- `Mass Treatment`
- `Surgical Intervention`
- `Other`

**ملاحظة مهمة:** يمكن تكرار نفس المربي أكثر من مرة في نفس اليوم

### 2-7. نفس endpoints السابقة
```http
GET /treatment
GET /treatment/stats
GET /treatment/filter?diagnosis=keyword
GET /treatment/:reportId
PUT /treatment/:reportId
DELETE /treatment/:reportId
```

---

## المختبرات (Laboratory)

### 1. إنشاء تقرير مختبر
```http
POST /lab/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "serial_no": "LAB-2025-001",
  "service_request": "serviceRequestId",
  "client": "clientId",
  "team": "teamId",
  "report_date": "2025-10-01",
  "veterinarian_name": "د. محمد أحمد",
  "sample_code": "CAM-BLD-2025-001",
  "animal_type": "Camel",
  "sample_type": "Blood",
  "sample_valid_for_testing": true,
  "test_result": "سلبي - لا توجد طفيليات",
  "diagnosis": "القطيع سليم من الأمراض",
  "request_date": "2025-09-25",
  "request_status": "Closed",
  "request_fulfilling_date": "2025-10-01",
  "remarks": "العينة صالحة والنتيجة سلبية"
}
```

**أنواع الحيوانات:**
- `Sheep`
- `Goat`
- `Camel`
- `Horse`
- `Cattle`
- `Other`

**أنواع العينات:**
- `Blood` - دم
- `Urine` - بول
- `Feces` - براز
- `Tissue` - نسيج
- `Swab` - مسحة
- `Milk` - حليب
- `Other` - أخرى

### 2. البحث بكود العينة
```http
GET /lab/sample/:sampleCode
Authorization: Bearer <token>
```

### 3-8. نفس endpoints السابقة
```http
GET /lab
GET /lab/stats
GET /lab/filter?animalType=Camel&sampleType=Blood&sampleValid=true
GET /lab/:reportId
PUT /lab/:reportId
DELETE /lab/:reportId
```

---

## صحة الخيول (Horse Health)

### 1. إنشاء تقرير صحة خيول
```http
POST /horse-health/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "serial_no": "HH-2025-001",
  "service_request": "serviceRequestId",
  "client": "clientId",
  "team": "teamId",
  "report_date": "2025-10-01",
  "total_horses": 25,
  "young_horses": 5,
  "female_horses": 15,
  "health_check_type": "Complete Health Assessment",
  "health_status": "Healthy",
  "diagnosis": "جميع الخيول في حالة صحية ممتازة",
  "treatment_provided": "تطعيمات وقائية",
  "vaccinations_given": [
    {
      "vaccine_name": "Tetanus",
      "quantity": 25,
      "batch_number": "TET-2025-001"
    },
    {
      "vaccine_name": "Influenza",
      "quantity": 25,
      "batch_number": "FLU-2025-002"
    }
  ],
  "parasite_control": {
    "applied": true,
    "treatment_type": "Ivermectin",
    "quantity": 10
  },
  "lab_tests": [
    {
      "test_type": "فحص دم شامل",
      "sample_code": "HRS-BLD-2025-001",
      "result": "طبيعي"
    }
  ],
  "request_date": "2025-09-20",
  "request_status": "Closed",
  "request_fulfilling_date": "2025-10-01",
  "remarks": "تقرير شامل لصحة الخيول"
}
```

**أنواع الفحص الصحي:**
- `Routine Check`
- `Vaccination`
- `Treatment`
- `Parasite Control`
- `Emergency`
- `Complete Health Assessment`

### 2. التقرير الشامل
```http
GET /horse-health/comprehensive?startDate=2025-09-01&endDate=2025-10-01
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reports": [...],
    "summary": {
      "totalReports": 15,
      "totalHorses": 350,
      "byHealthCheckType": {
        "Routine Check": 5,
        "Vaccination": 6,
        "Complete Health Assessment": 4
      },
      "byHealthStatus": {
        "Healthy": 13,
        "Under Treatment": 2
      }
    }
  }
}
```

### 3-8. نفس endpoints السابقة
```http
GET /horse-health
GET /horse-health/stats
GET /horse-health/filter?healthCheckType=Vaccination&healthStatus=Healthy
GET /horse-health/:reportId
PUT /horse-health/:reportId
DELETE /horse-health/:reportId
```

---

## أكواد الحالة (Status Codes)

- `200` - نجاح العملية
- `201` - تم الإنشاء بنجاح
- `400` - خطأ في البيانات المرسلة
- `401` - غير مصرح (يجب تسجيل الدخول)
- `403` - ممنوع (لا توجد صلاحية)
- `404` - غير موجود
- `500` - خطأ في الخادم

---

## ملاحظات مهمة

1. **جميع الطلبات تتطلب Token** في الـ Header ما عدا تسجيل الدخول
2. **التواريخ** يجب أن تكون بصيغة ISO 8601: `YYYY-MM-DD`
3. **الإحصائيات** تدعم الفلترة حسب التاريخ
4. **البحث** يدعم البحث الجزئي (case-insensitive)
5. **الحقول المحسوبة** (مثل total_herd, total_treated) يتم حسابها تلقائياً
6. **لا يمكن تعديل** الهوية الوطنية (national_id) بعد الإنشاء
7. **المربي الواحد** يمكنه إضافة حتى 3 مواقع فقط
8. **في قسم العلاج** يمكن تكرار نفس المربي أكثر من مرة في نفس اليوم

---

## أمثلة على Responses

### نجاح العملية
```json
{
  "success": true,
  "message": "تم إنشاء التقرير بنجاح",
  "data": {
    "_id": "...",
    "serial_no": "PC-2025-001",
    ...
  }
}
```

### خطأ في البيانات
```json
{
  "success": false,
  "message": "لا يمكن للمربي إضافة أكثر من 3 مواقع"
}
```

### خطأ في الصلاحيات
```json
{
  "success": false,
  "message": "ليس لديك صلاحية الوصول لهذا القسم"
}
```
