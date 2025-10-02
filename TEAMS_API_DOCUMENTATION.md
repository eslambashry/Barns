# توثيق API - إدارة الفرق (Teams Management)

## نظرة عامة
نظام إدارة الفرق يسمح بإنشاء فرق لكل قسم من الأقسام الخمسة، حيث يكون كل فريق مسؤولاً عن قطيع معين لعميل معين.

## هيكل الفريق (Team Structure)

```json
{
  "_id": "teamId",
  "team_name": "فريق مكافحة الطفيليات - المنطقة الشمالية",
  "department": {
    "_id": "departmentId",
    "name": "Parasite Control",
    "code": "P"
  },
  "assigned_client": {
    "_id": "clientId",
    "name": "أحمد محمد",
    "national_id": "1234567890",
    "phone": "0501234567"
  },
  "assigned_village": "القرية الشمالية",
  "team_members": [
    {
      "user": {
        "_id": "userId",
        "name": "د. محمد أحمد",
        "email": "mohamed@barns.com"
      },
      "role": "Veterinarian"
    },
    {
      "user": {
        "_id": "userId2",
        "name": "علي حسن",
        "email": "ali@barns.com"
      },
      "role": "Assistant"
    }
  ],
  "supervisor": {
    "_id": "supervisorId",
    "name": "د. خالد السعيد",
    "email": "khaled@barns.com"
  },
  "vehicle_no": "ABC-1234",
  "status": "Active",
  "notes": "فريق متخصص في مكافحة الطفيليات",
  "createdAt": "2025-10-01T00:00:00.000Z",
  "updatedAt": "2025-10-01T00:00:00.000Z"
}
```

## أدوار أعضاء الفريق (Team Member Roles)
- `Supervisor` - مشرف
- `Veterinarian` - طبيب بيطري
- `Assistant` - مساعد
- `Driver` - سائق

## حالات الفريق (Team Status)
- `Active` - نشط
- `Inactive` - غير نشط
- `On Leave` - في إجازة

---

## API Endpoints

### 1. إنشاء فريق جديد
```http
POST /teams/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "team_name": "فريق مكافحة الطفيليات - المنطقة الشمالية",
  "department": "departmentId",
  "assigned_client": "clientId",
  "assigned_village": "القرية الشمالية",
  "team_members": [
    {
      "user": "userId1",
      "role": "Veterinarian"
    },
    {
      "user": "userId2",
      "role": "Assistant"
    }
  ],
  "supervisor": "supervisorId",
  "vehicle_no": "ABC-1234",
  "notes": "فريق متخصص في مكافحة الطفيليات"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم إنشاء الفريق بنجاح",
  "data": { /* Team Object */ }
}
```

**ملاحظات:**
- `assigned_client` و `assigned_village` اختياريان (يمكن أن يكون الفريق عام)
- إذا تم تحديد `assigned_village` يجب أن تكون موجودة لدى العميل المحدد
- يتطلب صلاحيات مشرف

---

### 2. الحصول على جميع الفرق
```http
GET /teams
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "count": 15,
  "data": [ /* Array of Teams */ ]
}
```

---

### 3. الحصول على فرق قسم معين
```http
GET /teams/department/:departmentId
Authorization: Bearer <token>
```

**مثال:**
```http
GET /teams/department/67890abcdef
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [ /* Teams for this department */ ]
}
```

---

### 4. الحصول على فرق عميل معين
```http
GET /teams/client/:clientId
Authorization: Bearer <token>
```

**مثال:**
```http
GET /teams/client/12345abcdef
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [ /* Teams assigned to this client */ ]
}
```

**استخدام:** معرفة جميع الفرق المسؤولة عن قطيع عميل معين

---

### 5. الحصول على فريق واحد
```http
GET /teams/:teamId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": { /* Team Object with full details */ }
}
```

---

### 6. تحديث فريق
```http
PUT /teams/:teamId
Authorization: Bearer <token>
Content-Type: application/json

{
  "team_name": "اسم جديد للفريق",
  "assigned_client": "newClientId",
  "assigned_village": "قرية جديدة",
  "vehicle_no": "XYZ-5678",
  "notes": "ملاحظات محدثة"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم تحديث الفريق بنجاح",
  "data": { /* Updated Team */ }
}
```

---

### 7. تغيير حالة الفريق
```http
PATCH /teams/:teamId/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Inactive"
}
```

**الحالات المتاحة:**
- `Active`
- `Inactive`
- `On Leave`

**Response:**
```json
{
  "success": true,
  "message": "تم تحديث حالة الفريق بنجاح",
  "data": { /* Updated Team */ }
}
```

---

### 8. إضافة عضو للفريق
```http
POST /teams/:teamId/add-member
Authorization: Bearer <token>
Content-Type: application/json

{
  "user": "userId",
  "role": "Assistant"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم إضافة العضو بنجاح",
  "data": { /* Updated Team */ }
}
```

**ملاحظات:**
- لا يمكن إضافة نفس المستخدم مرتين
- الأدوار المتاحة: Supervisor, Veterinarian, Assistant, Driver

---

### 9. إزالة عضو من الفريق
```http
DELETE /teams/:teamId/remove-member/:userId
Authorization: Bearer <token>
```

**مثال:**
```http
DELETE /teams/12345abc/remove-member/67890def
```

**Response:**
```json
{
  "success": true,
  "message": "تم إزالة العضو بنجاح",
  "data": { /* Updated Team */ }
}
```

---

### 10. حذف فريق
```http
DELETE /teams/:teamId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "تم حذف الفريق بنجاح"
}
```

---

### 11. فلترة الفرق
```http
GET /teams/filter?department=departmentId&status=Active&assigned_client=clientId&assigned_village=القرية
Authorization: Bearer <token>
```

**Query Parameters:**
- `department` (optional) - معرف القسم
- `status` (optional) - حالة الفريق
- `assigned_client` (optional) - معرف العميل المسؤول عنه
- `assigned_village` (optional) - اسم القرية

**مثال:**
```http
GET /teams/filter?department=67890abc&status=Active
```

**Response:**
```json
{
  "success": true,
  "count": 8,
  "data": [ /* Filtered Teams */ ]
}
```

---

## حالات الاستخدام (Use Cases)

### 1. إنشاء فريق عام (غير مخصص لعميل)
```json
{
  "team_name": "فريق التطعيم المتنقل",
  "department": "vaccinationDepartmentId",
  "supervisor": "supervisorId",
  "vehicle_no": "VAC-001",
  "team_members": [...]
}
```
**الاستخدام:** فريق يخدم عدة عملاء حسب الحاجة

---

### 2. إنشاء فريق مخصص لعميل معين
```json
{
  "team_name": "فريق مكافحة الطفيليات - مزرعة أحمد",
  "department": "parasiteControlDepartmentId",
  "assigned_client": "clientId",
  "assigned_village": "القرية الشمالية",
  "supervisor": "supervisorId",
  "vehicle_no": "PC-001",
  "team_members": [...]
}
```
**الاستخدام:** فريق مخصص لخدمة قطيع عميل معين في قرية محددة

---

### 3. معرفة جميع الفرق المسؤولة عن عميل
```http
GET /teams/client/clientId
```
**الاستخدام:** معرفة كل الفرق التي تخدم عميل معين (من أقسام مختلفة)

---

### 4. معرفة فرق قسم معين
```http
GET /teams/department/parasiteControlDepartmentId
```
**الاستخدام:** معرفة جميع فرق قسم مكافحة الطفيليات

---

### 5. فلترة الفرق النشطة لقسم معين
```http
GET /teams/filter?department=departmentId&status=Active
```
**الاستخدام:** معرفة الفرق النشطة فقط في قسم معين

---

## أمثلة كاملة

### مثال 1: إنشاء فريق مكافحة طفيليات لعميل معين

**الطلب:**
```http
POST /teams/create
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "team_name": "فريق مكافحة الطفيليات - مزرعة الشمال",
  "department": "67890parasiteDeptId",
  "assigned_client": "12345clientId",
  "assigned_village": "القرية الشمالية",
  "team_members": [
    {
      "user": "vet123userId",
      "role": "Veterinarian"
    },
    {
      "user": "assist456userId",
      "role": "Assistant"
    },
    {
      "user": "driver789userId",
      "role": "Driver"
    }
  ],
  "supervisor": "super111userId",
  "vehicle_no": "PC-2025-001",
  "notes": "فريق متخصص في مكافحة الطفيليات للأغنام والماعز"
}
```

**الاستجابة:**
```json
{
  "success": true,
  "message": "تم إنشاء الفريق بنجاح",
  "data": {
    "_id": "team12345Id",
    "team_name": "فريق مكافحة الطفيليات - مزرعة الشمال",
    "department": {
      "_id": "67890parasiteDeptId",
      "name": "Parasite Control",
      "code": "P"
    },
    "assigned_client": {
      "_id": "12345clientId",
      "name": "أحمد محمد علي",
      "national_id": "1234567890",
      "phone": "0501234567"
    },
    "assigned_village": "القرية الشمالية",
    "team_members": [
      {
        "user": {
          "_id": "vet123userId",
          "name": "د. محمد أحمد",
          "email": "mohamed@barns.com"
        },
        "role": "Veterinarian"
      },
      {
        "user": {
          "_id": "assist456userId",
          "name": "علي حسن",
          "email": "ali@barns.com"
        },
        "role": "Assistant"
      },
      {
        "user": {
          "_id": "driver789userId",
          "name": "خالد عبدالله",
          "email": "khaled@barns.com"
        },
        "role": "Driver"
      }
    ],
    "supervisor": {
      "_id": "super111userId",
      "name": "د. عبدالرحمن السعيد",
      "email": "supervisor@barns.com"
    },
    "vehicle_no": "PC-2025-001",
    "status": "Active",
    "notes": "فريق متخصص في مكافحة الطفيليات للأغنام والماعز",
    "createdAt": "2025-10-01T19:00:00.000Z",
    "updatedAt": "2025-10-01T19:00:00.000Z"
  }
}
```

---

### مثال 2: معرفة جميع الفرق المسؤولة عن عميل معين

**الطلب:**
```http
GET /teams/client/12345clientId
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**الاستجابة:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "team1Id",
      "team_name": "فريق مكافحة الطفيليات - مزرعة الشمال",
      "department": {
        "name": "Parasite Control",
        "code": "P"
      },
      "assigned_village": "القرية الشمالية",
      "status": "Active"
    },
    {
      "_id": "team2Id",
      "team_name": "فريق التطعيم - مزرعة الشمال",
      "department": {
        "name": "Vaccination",
        "code": "V"
      },
      "assigned_village": "القرية الشمالية",
      "status": "Active"
    },
    {
      "_id": "team3Id",
      "team_name": "فريق المختبر - مزرعة الشمال",
      "department": {
        "name": "Laboratory",
        "code": "L"
      },
      "assigned_village": "القرية الجنوبية",
      "status": "Active"
    }
  ]
}
```

---

## ملاحظات مهمة

1. **الفرق العامة vs المخصصة:**
   - يمكن إنشاء فرق عامة (بدون `assigned_client`) تخدم عدة عملاء
   - يمكن إنشاء فرق مخصصة لعميل معين في قرية محددة

2. **التحقق من القرية:**
   - إذا تم تحديد `assigned_village` يجب أن تكون موجودة في قائمة قرى العميل

3. **الصلاحيات:**
   - إنشاء وتعديل وحذف الفرق يتطلب صلاحيات مشرف
   - عرض الفرق متاح لجميع المستخدمين المصرح لهم

4. **أعضاء الفريق:**
   - يمكن إضافة عدة أعضاء للفريق
   - لا يمكن تكرار نفس المستخدم في نفس الفريق
   - كل عضو له دور محدد

5. **حالة الفريق:**
   - يمكن تغيير حالة الفريق بين Active, Inactive, On Leave
   - الفرق غير النشطة لا تظهر في التقارير الافتراضية

---

## الربط مع التقارير

عند إنشاء تقرير (مكافحة طفيليات، تطعيم، إلخ)، يتم ربطه بالفريق المسؤول:

```json
{
  "serial_no": "PC-2025-001",
  "service_request": "requestId",
  "client": "clientId",
  "team": "team12345Id",  // ← الفريق المسؤول
  "report_date": "2025-10-01",
  ...
}
```

هذا يسمح بتتبع:
- أي فريق قام بالخدمة
- من هو المشرف المسؤول
- أعضاء الفريق الذين شاركوا
- المركبة المستخدمة
