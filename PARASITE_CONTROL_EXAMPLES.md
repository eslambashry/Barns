# أمثلة Requests - قسم مكافحة الطفيليات

## 🔐 المصادقة أولاً

### تسجيل الدخول
```http
POST http://localhost:3000/auth/login
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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "name": "Super Admin",
    "email": "admin@barns.com"
  }
}
```

**احفظ الـ Token واستخدمه في جميع الطلبات التالية:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📋 الخطوات الكاملة

### الخطوة 1: إضافة مربي جديد

```http
POST http://localhost:3000/clients/add
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "أحمد محمد علي",
  "national_id": "1234567890",
  "birth_date": "1980-05-15",
  "phone": "0501234567",
  "villages": [
    {
      "name": "القرية الشمالية",
      "n_coordinate": 26.738551,
      "e_coordinate": 37.840469
    }
  ],
  "available_services": [
    "Parasite Control",
    "Vaccination",
    "Treatment & Monitoring",
    "Lab Test",
    "Horse Health"
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
    "name": "أحمد محمد علي",
    "national_id": "1234567890",
    "birth_date": "1980-05-15T00:00:00.000Z",
    "phone": "0501234567",
    "villages": [
      {
        "name": "القرية الشمالية",
        "n_coordinate": 26.738551,
        "e_coordinate": 37.840469
      }
    ],
    "available_services": [
      "Parasite Control",
      "Vaccination",
      "Treatment & Monitoring",
      "Lab Test",
      "Horse Health"
    ],
    "createdAt": "2025-10-01T19:00:00.000Z",
    "updatedAt": "2025-10-01T19:00:00.000Z"
  }
}
```

---

### الخطوة 2: إنشاء فريق مكافحة طفيليات

```http
POST http://localhost:3000/teams/create
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "team_name": "فريق مكافحة الطفيليات - المنطقة الشمالية",
  "department": "DEPARTMENT_ID_HERE",
  "assigned_client": "67890clientId123",
  "assigned_village": "القرية الشمالية",
  "team_members": [
    {
      "user": "USER_ID_VET",
      "role": "Veterinarian"
    },
    {
      "user": "USER_ID_ASSISTANT",
      "role": "Assistant"
    }
  ],
  "supervisor": "SUPERVISOR_USER_ID",
  "vehicle_no": "PC-2025-001",
  "notes": "فريق متخصص في مكافحة الطفيليات للأغنام والماعز"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم إنشاء الفريق بنجاح",
  "data": {
    "_id": "team12345Id",
    "team_name": "فريق مكافحة الطفيليات - المنطقة الشمالية",
    "department": {
      "_id": "deptId",
      "name": "Parasite Control",
      "code": "P"
    },
    "assigned_client": {
      "_id": "67890clientId123",
      "name": "أحمد محمد علي"
    },
    "assigned_village": "القرية الشمالية",
    "vehicle_no": "PC-2025-001",
    "status": "Active"
  }
}
```

---

### الخطوة 3: إنشاء طلب خدمة

```http
POST http://localhost:3000/service-requests/create
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "client": "67890clientId123",
  "village": "القرية الشمالية",
  "category": "Parasite Control",
  "remarks": "طلب رش وقائي للقطيع"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم إنشاء طلب الخدمة بنجاح",
  "data": {
    "_id": "serviceReqId123",
    "client": "67890clientId123",
    "village": "القرية الشمالية",
    "request_date": "2025-10-01T19:00:00.000Z",
    "status": "Open",
    "category": "Parasite Control",
    "remarks": "طلب رش وقائي للقطيع"
  }
}
```

---

### الخطوة 4: إنشاء تقرير مكافحة طفيليات

```http
POST http://localhost:3000/parasite-control/create
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "serial_no": "PC-2025-001",
  "service_request": "serviceReqId123",
  "client": "67890clientId123",
  "team": "team12345Id",
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
      "type": "سايبرمثرين 10%",
      "category": "مبيدات البيرثرويد",
      "quantity": 15.5
    },
    {
      "type": "ديازينون 60%",
      "category": "مبيدات الفوسفات العضوية",
      "quantity": 10
    }
  ],
  "animal_barns": {
    "is_treated": true,
    "area_sqm": 500,
    "insecticide_type": "دلتامثرين 2.5%",
    "insecticide_quantity": 25
  },
  "breeding_status": "موسم التزاوج",
  "herd_health_status": "Healthy",
  "complying_to_instructions": true,
  "parasite_control_requirement_fulfilled": true,
  "request_situation": "Closed",
  "request_fulfilling_date": "2025-10-01",
  "category": "Parasite Control Activity",
  "remarks": "تم الرش بنجاح. القطيع في حالة صحية ممتازة. تم رش الحظائر أيضاً. يُنصح بإعادة الرش بعد 3 أسابيع."
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم إنشاء تقرير مكافحة الطفيليات بنجاح",
  "data": {
    "_id": "reportId123",
    "serial_no": "PC-2025-001",
    "service_request": "serviceReqId123",
    "client": {
      "_id": "67890clientId123",
      "name": "أحمد محمد علي",
      "national_id": "1234567890",
      "phone": "0501234567"
    },
    "team": {
      "_id": "team12345Id",
      "team_name": "فريق مكافحة الطفيليات - المنطقة الشمالية"
    },
    "report_date": "2025-10-01T00:00:00.000Z",
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
      "treated_cattle": 10,
      "total_herd": 260,
      "total_young": 52,
      "total_female": 158,
      "total_treated": 248
    },
    "insecticides_used": [
      {
        "type": "سايبرمثرين 10%",
        "category": "مبيدات البيرثرويد",
        "quantity": 15.5
      },
      {
        "type": "ديازينون 60%",
        "category": "مبيدات الفوسفات العضوية",
        "quantity": 10
      }
    ],
    "animal_barns": {
      "is_treated": true,
      "area_sqm": 500,
      "insecticide_type": "دلتامثرين 2.5%",
      "insecticide_quantity": 25
    },
    "herd_health_status": "Healthy",
    "parasite_control_requirement_fulfilled": true,
    "request_situation": "Closed",
    "createdAt": "2025-10-01T19:00:00.000Z",
    "updatedAt": "2025-10-01T19:00:00.000Z"
  }
}
```

---

## 📊 الاستعلامات

### 1. الحصول على جميع تقارير مكافحة الطفيليات

```http
GET http://localhost:3000/parasite-control
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "_id": "reportId123",
      "serial_no": "PC-2025-001",
      "client": {
        "name": "أحمد محمد علي"
      },
      "report_date": "2025-10-01T00:00:00.000Z",
      "herd_information": {
        "total_herd": 260,
        "total_treated": 248
      },
      "request_situation": "Closed"
    }
    // ... المزيد من التقارير
  ]
}
```

---

### 2. الحصول على تقرير واحد

```http
GET http://localhost:3000/parasite-control/reportId123
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### 3. فلترة التقارير حسب التاريخ

```http
GET http://localhost:3000/parasite-control/filter?startDate=2025-09-01&endDate=2025-10-01
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    // التقارير المفلترة
  ]
}
```

---

### 4. فلترة التقارير حسب العميل

```http
GET http://localhost:3000/parasite-control/filter?clientId=67890clientId123
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### 5. فلترة التقارير حسب التاريخ والعميل

```http
GET http://localhost:3000/parasite-control/filter?startDate=2025-09-01&endDate=2025-10-01&clientId=67890clientId123
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### 6. الحصول على إحصائيات

```http
GET http://localhost:3000/parasite-control/stats?startDate=2025-09-01&endDate=2025-10-01
Authorization: Bearer YOUR_TOKEN_HERE
```

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

---

## 🔄 التحديث والحذف

### تحديث تقرير

```http
PUT http://localhost:3000/parasite-control/reportId123
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "remarks": "تحديث: تم إضافة ملاحظة حول ضرورة المتابعة بعد أسبوعين",
  "request_situation": "Closed",
  "request_fulfilling_date": "2025-10-01"
}
```

---

### حذف تقرير

```http
DELETE http://localhost:3000/parasite-control/reportId123
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
{
  "success": true,
  "message": "تم حذف التقرير بنجاح"
}
```

---

## 📝 أمثلة إضافية

### مثال 1: تقرير لقطيع أغنام فقط

```json
{
  "serial_no": "PC-2025-002",
  "service_request": "serviceReqId456",
  "client": "clientId456",
  "team": "teamId456",
  "report_date": "2025-10-02",
  "herd_information": {
    "total_sheep": 200,
    "young_sheep": 40,
    "female_sheep": 120,
    "treated_sheep": 195,
    "total_goats": 0,
    "young_goats": 0,
    "female_goats": 0,
    "treated_goats": 0,
    "total_camel": 0,
    "young_camels": 0,
    "female_camels": 0,
    "treated_camels": 0,
    "total_cattle": 0,
    "young_cattle": 0,
    "female_cattle": 0,
    "treated_cattle": 0
  },
  "insecticides_used": [
    {
      "type": "إيفرمكتين 1%",
      "category": "مبيدات الأفرمكتين",
      "quantity": 20
    }
  ],
  "animal_barns": {
    "is_treated": true,
    "area_sqm": 300,
    "insecticide_type": "سايبرمثرين 10%",
    "insecticide_quantity": 15
  },
  "breeding_status": "فترة الحمل",
  "herd_health_status": "Healthy",
  "complying_to_instructions": true,
  "parasite_control_requirement_fulfilled": true,
  "request_situation": "Closed",
  "request_fulfilling_date": "2025-10-02",
  "remarks": "تم الرش بنجاح. القطيع في حالة حمل، تم استخدام مبيدات آمنة."
}
```

---

### مثال 2: تقرير لقطيع إبل

```json
{
  "serial_no": "PC-2025-003",
  "service_request": "serviceReqId789",
  "client": "clientId789",
  "team": "teamId789",
  "report_date": "2025-10-03",
  "herd_information": {
    "total_sheep": 0,
    "young_sheep": 0,
    "female_sheep": 0,
    "treated_sheep": 0,
    "total_goats": 0,
    "young_goats": 0,
    "female_goats": 0,
    "treated_goats": 0,
    "total_camel": 50,
    "young_camels": 10,
    "female_camels": 30,
    "treated_camels": 48,
    "total_cattle": 0,
    "young_cattle": 0,
    "female_cattle": 0,
    "treated_cattle": 0
  },
  "insecticides_used": [
    {
      "type": "دورامكتين",
      "category": "مبيدات الأفرمكتين",
      "quantity": 12
    }
  ],
  "animal_barns": {
    "is_treated": false,
    "area_sqm": 0,
    "insecticide_type": "",
    "insecticide_quantity": 0
  },
  "breeding_status": "عادي",
  "herd_health_status": "Healthy",
  "complying_to_instructions": true,
  "parasite_control_requirement_fulfilled": true,
  "request_situation": "Closed",
  "request_fulfilling_date": "2025-10-03",
  "remarks": "تم علاج الإبل من الطفيليات الداخلية. لم يتم رش الحظائر (إبل مفتوحة)."
}
```

---

### مثال 3: تقرير قطيع مختلط

```json
{
  "serial_no": "PC-2025-004",
  "service_request": "serviceReqId101",
  "client": "clientId101",
  "team": "teamId101",
  "report_date": "2025-10-04",
  "herd_information": {
    "total_sheep": 100,
    "young_sheep": 20,
    "female_sheep": 60,
    "treated_sheep": 98,
    "total_goats": 50,
    "young_goats": 10,
    "female_goats": 30,
    "treated_goats": 48,
    "total_camel": 15,
    "young_camels": 3,
    "female_camels": 9,
    "treated_camels": 15,
    "total_cattle": 25,
    "young_cattle": 5,
    "female_cattle": 15,
    "treated_cattle": 24
  },
  "insecticides_used": [
    {
      "type": "سايبرمثرين 10%",
      "category": "مبيدات البيرثرويد",
      "quantity": 18
    },
    {
      "type": "إيفرمكتين 1%",
      "category": "مبيدات الأفرمكتين",
      "quantity": 15
    }
  ],
  "animal_barns": {
    "is_treated": true,
    "area_sqm": 800,
    "insecticide_type": "دلتامثرين 2.5%",
    "insecticide_quantity": 40
  },
  "breeding_status": "مختلط",
  "herd_health_status": "Healthy",
  "complying_to_instructions": true,
  "parasite_control_requirement_fulfilled": true,
  "request_situation": "Closed",
  "request_fulfilling_date": "2025-10-04",
  "remarks": "قطيع مختلط كبير. تم استخدام مبيدات متعددة حسب نوع الحيوان. جميع الحظائر تم رشها."
}
```

---

## 🧪 اختبار باستخدام Postman

### 1. إنشاء Collection جديدة
- اسمها: `Barns - Parasite Control`

### 2. إضافة Environment Variables
```
base_url: http://localhost:3000
token: (سيتم ملؤه بعد Login)
client_id: (سيتم ملؤه بعد إنشاء مربي)
team_id: (سيتم ملؤه بعد إنشاء فريق)
service_request_id: (سيتم ملؤه بعد إنشاء طلب)
```

### 3. ترتيب الطلبات
1. Login
2. Add Client
3. Create Team
4. Create Service Request
5. Create Parasite Control Report
6. Get All Reports
7. Get Report by ID
8. Filter Reports
9. Get Stats
10. Update Report
11. Delete Report

---

## 🎯 ملاحظات مهمة

1. **الإجماليات تُحسب تلقائياً:**
   - `total_herd` = مجموع كل الحيوانات
   - `total_young` = مجموع الصغار
   - `total_female` = مجموع الإناث
   - `total_treated` = مجموع المعالجين

2. **الحقول المطلوبة:**
   - `serial_no` (فريد)
   - `service_request`
   - `client`
   - `team`
   - `report_date`
   - `herd_information`

3. **الحقول الاختيارية:**
   - `insecticides_used`
   - `animal_barns`
   - `breeding_status`
   - `remarks`

4. **حالات الطلب:**
   - `Open` - مفتوح
   - `In-Progress` - قيد التنفيذ
   - `Closed` - مغلق
   - `Cancelled` - ملغي

5. **حالات القطيع الصحية:**
   - `Healthy` - سليم
   - `Sick` - مريض
   - `Under Treatment` - تحت العلاج
   - `Quarantine` - حجر صحي
