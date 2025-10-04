# أمثلة Authentication Requests

## 📋 جدول المحتويات
1. [التسجيل (Signup)](#1-التسجيل-signup)
2. [تسجيل الدخول (Login)](#2-تسجيل-الدخول-login)
3. [إضافة مستخدم (Add User)](#3-إضافة-مستخدم-add-user)
4. [نسيت كلمة المرور (Forget Password)](#4-نسيت-كلمة-المرور-forget-password)
5. [إعادة تعيين كلمة المرور (Reset Password)](#5-إعادة-تعيين-كلمة-المرور-reset-password)
6. [حذف مستخدم (Delete User)](#6-حذف-مستخدم-delete-user)

---

## 1. التسجيل (Signup)

### Request
```http
POST http://localhost:6060/auth/register
Content-Type: application/json

{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "password": "Ahmed@123",
  "roleName": "super_admin"
}
```

### Response (Success)
```json
{
  "success": true,
  "message": "تم إنشاء الحساب بنجاح",
  "data": {
    "_id": "67890abcdef12345",
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "role": {
      "_id": "12345abcdef67890",
      "name": "super_admin",
      "description": "مدير عام - صلاحية كاملة على جميع الأقسام"
    },
    "createdAt": "2025-10-03T17:30:00.000Z",
    "updatedAt": "2025-10-03T17:30:00.000Z"
  }
}
```

### أمثلة أخرى للأدوار:

#### مشرف مكافحة الطفيليات
```json
{
  "name": "خالد أحمد",
  "email": "khaled@example.com",
  "password": "Khaled@123",
  "roleName": "parasite_control_supervisor"
}
```

#### مشرف التطعيم
```json
{
  "name": "محمد سالم",
  "email": "mohamed@example.com",
  "password": "Mohamed@123",
  "roleName": "vaccination_supervisor"
}
```

#### مشرف العلاج
```json
{
  "name": "علي حسن",
  "email": "ali@example.com",
  "password": "Ali@123",
  "roleName": "treatment_supervisor"
}
```

#### مشرف المختبر
```json
{
  "name": "سعد فهد",
  "email": "saad@example.com",
  "password": "Saad@123",
  "roleName": "lab_supervisor"
}
```

#### مشرف صحة الخيول
```json
{
  "name": "فهد عبدالله",
  "email": "fahad@example.com",
  "password": "Fahad@123",
  "roleName": "horse_health_supervisor"
}
```

#### عضو فريق
```json
{
  "name": "عبدالرحمن سعود",
  "email": "abdulrahman@example.com",
  "password": "Abdulrahman@123",
  "roleName": "team_member"
}
```

---

## 2. تسجيل الدخول (Login)

### Request
```http
POST http://localhost:6060/auth/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "Ahmed@123"
}
```

### Response (Success)
```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "data": {
    "_id": "67890abcdef12345",
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "role": {
      "_id": "12345abcdef67890",
      "name": "super_admin",
      "description": "مدير عام - صلاحية كاملة على جميع الأقسام"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWVkQGV4YW1wbGUuY29tIiwiX2lkIjoiNjc4OTBhYmNkZWYxMjM0NSIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTcyODMyNDYwMCwiZXhwIjoxNzI4OTI5NDAwfQ.abc123def456ghi789jkl012mno345pqr678stu901vwx234yz"
  }
}
```

### استخدام الـ Token
بعد تسجيل الدخول، استخدم الـ token في جميع الـ requests:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 3. إضافة مستخدم (Add User)

**ملاحظة:** يحتاج صلاحيات Super Admin

### Request
```http
POST http://localhost:6060/auth/addUser
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "name": "يوسف عبدالعزيز",
  "email": "yousef@example.com",
  "password": "Yousef@123",
  "roleName": "vaccination_supervisor"
}
```

### Response (Success)
```json
{
  "success": true,
  "message": "تم إنشاء المستخدم بنجاح",
  "data": {
    "_id": "abc123def456ghi789",
    "name": "يوسف عبدالعزيز",
    "email": "yousef@example.com",
    "role": {
      "_id": "role123456",
      "name": "vaccination_supervisor",
      "description": "مشرف قسم التطعيم"
    },
    "createdAt": "2025-10-03T18:00:00.000Z",
    "updatedAt": "2025-10-03T18:00:00.000Z"
  }
}
```

---

## 4. نسيت كلمة المرور (Forget Password)

### Request
```http
POST http://localhost:6060/auth/forget-Password
Content-Type: application/json

{
  "email": "ahmed@example.com"
}
```

### Response (Success)
```json
{
  "success": true,
  "message": "تم إرسال رابط إعادة تعيين كلمة المرور",
  "resetToken": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
}
```

**ملاحظة:** الـ `resetToken` يظهر فقط في بيئة التطوير. في الإنتاج، يُرسل عبر البريد الإلكتروني.

---

## 5. إعادة تعيين كلمة المرور (Reset Password)

### Request
```http
POST http://localhost:6060/auth/reset-password
Content-Type: application/json

{
  "token": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
  "newPassword": "NewPassword@123"
}
```

### Response (Success)
```json
{
  "success": true,
  "message": "تم إعادة تعيين كلمة المرور بنجاح"
}
```

---

## 6. حذف مستخدم (Delete User)

**ملاحظة:** يحتاج صلاحيات Super Admin

### Request
```http
DELETE http://localhost:6060/auth/abc123def456ghi789
Authorization: Bearer YOUR_TOKEN_HERE
```

### Response (Success)
```json
{
  "success": true,
  "message": "تم حذف المستخدم بنجاح"
}
```

---

## 🔐 الأدوار المتاحة (Roles)

| الدور | الاسم بالإنجليزية | الوصف |
|------|-------------------|-------|
| مدير عام | `super_admin` | صلاحية كاملة على جميع الأقسام |
| مشرف مكافحة الطفيليات | `parasite_control_supervisor` | إدارة قسم مكافحة الطفيليات |
| مشرف التطعيم | `vaccination_supervisor` | إدارة قسم التطعيم |
| مشرف العلاج | `treatment_supervisor` | إدارة قسم المراقبة والعلاج |
| مشرف المختبر | `lab_supervisor` | إدارة قسم المختبرات |
| مشرف صحة الخيول | `horse_health_supervisor` | إدارة قسم صحة الخيول |
| عضو فريق | `team_member` | عضو في أحد الفرق |

---

## ⚠️ رسائل الأخطاء الشائعة

### 1. البريد الإلكتروني موجود مسبقاً
```json
{
  "success": false,
  "message": "البريد الإلكتروني موجود مسبقاً"
}
```

### 2. الدور غير موجود
```json
{
  "success": false,
  "message": "الدور غير موجود"
}
```

### 3. البريد الإلكتروني أو كلمة المرور غير صحيحة
```json
{
  "success": false,
  "message": "البريد الإلكتروني أو كلمة المرور غير صحيحة"
}
```

### 4. الرمز غير صحيح أو منتهي الصلاحية
```json
{
  "success": false,
  "message": "الرمز غير صحيح أو منتهي الصلاحية"
}
```

### 5. المستخدم غير موجود
```json
{
  "success": false,
  "message": "المستخدم غير موجود"
}
```

---

## 📝 ملاحظات مهمة

1. **كلمة المرور:**
   - يجب أن تكون 8 أحرف على الأقل
   - يُنصح بأن تحتوي على حرف كبير وحرف صغير ورقم

2. **Token:**
   - صالح لمدة 7 أيام
   - يجب إرساله في header مع كل request محمي

3. **Reset Token:**
   - صالح لمدة 10 دقائق فقط
   - يُستخدم مرة واحدة فقط

4. **الصلاحيات:**
   - Super Admin: يمكنه الوصول لكل شيء
   - المشرفون: يمكنهم الوصول لأقسامهم فقط
   - أعضاء الفريق: صلاحيات محدودة

---

## 🚀 سيناريو كامل

### 1. تسجيل حساب جديد
```http
POST /auth/register
{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "password": "Ahmed@123",
  "roleName": "super_admin"
}
```

### 2. تسجيل الدخول
```http
POST /auth/login
{
  "email": "ahmed@example.com",
  "password": "Ahmed@123"
}
```

### 3. استخدام الـ Token لإضافة مستخدم جديد
```http
POST /auth/addUser
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
{
  "name": "خالد أحمد",
  "email": "khaled@example.com",
  "password": "Khaled@123",
  "roleName": "parasite_control_supervisor"
}
```

### 4. إنشاء تقرير (باستخدام الـ Token)
```http
POST /parasite-control/create
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
{
  "serial_no": "PC-2025-001",
  "date": "2025-10-03",
  ...
}
```
