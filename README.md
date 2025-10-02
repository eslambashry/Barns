# نظام إدارة الخدمات البيطرية للمربيين (Barns Management System)

## نظرة عامة
نظام شامل لإدارة الخدمات البيطرية للمربيين يتضمن 5 أقسام رئيسية:
1. قسم مكافحة الطفيليات (Parasite Control)
2. قسم التطعيم (Vaccination)
3. قسم المراقبة والعلاج (Treatment & Monitoring)
4. قسم المختبرات (Laboratory)
5. قسم صحة الخيول (Horse Health)

## المتطلبات
- Node.js (v14 أو أحدث)
- MongoDB
- npm أو yarn

## التثبيت

```bash
# تثبيت الحزم
npm install

# إعداد ملف البيئة
# قم بإنشاء ملف .env في مجلد config وأضف المتغيرات التالية:
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SIGN_IN_TOKEN_SECRET=your_secret_key
```

## تشغيل المشروع

```bash
npm start
```

## هيكل النظام

### 1. المربيين (Clients)

#### القيود والشروط:
- كل مربي له هوية وطنية فريدة (national_id)
- المربي الواحد يمكنه إضافة حتى 3 مواقع/قرى (villages)
- لا يمكن تكرار نفس المربي في نفس القرية
- يمكن أن يكون عدة مربيين في نفس القرية
- يمكن أن يكون نفس المربي في عدة قرى مختلفة

#### البيانات المطلوبة:
- الاسم (name)
- الهوية الوطنية (national_id)
- تاريخ الميلاد (birth_date)
- رقم الجوال (phone)
- المواقع/القرى (villages) - كل موقع يحتوي على:
  - اسم القرية (name)
  - الإحداثيات الشمالية (n_coordinate)
  - الإحداثيات الشرقية (e_coordinate)
- الخدمات المتاحة (available_services) - بدون أسعار

### 2. الأقسام والخدمات

#### قسم مكافحة الطفيليات
**البيانات المطلوبة:**
- معلومات القطيع (الأغنام، الماعز، الإبل، الأبقار)
  - العدد الكلي، الصغار، الإناث، المعالج لكل نوع
- المبيدات المستخدمة (نوع، فئة، كمية)
- معلومات الحظائر (معالجة، المساحة، نوع المبيد، الكمية)
- حالة القطيع الصحية
- الامتثال للتعليمات

#### قسم التطعيم
**البيانات المطلوبة:**
- معلومات القطيع (مع عدد المحصنين بدلاً من المعالجين)
- اللقاحات المستخدمة (HS, SG-Pox, ET, FMD, PPR, إلخ)
- سهولة التعامل مع الحيوانات
- توفر العمالة
- سهولة الوصول للموقع
- حالة القطيع الصحية

#### قسم المراقبة والعلاج
**البيانات المطلوبة:**
- عدد الحيوانات (أغنام، ماعز، إبل، خيول، أبقار)
- التشخيص (diagnosis)
- فئة التدخل (Clinical Examination, Emergency Treatment, إلخ)
- العلاج المقدم
- عدد الحيوانات المعالجة
- ملاحظات العلاج (كيفية العلاج)
- **ملاحظة:** يمكن تكرار نفس المربي أكثر من مرة في نفس اليوم

#### قسم المختبرات
**البيانات المطلوبة:**
- اسم الطبيب الذي أخذ العينة
- كود العينة (فريد)
- نوع الحيوان
- نوع العينة (دم، بول، براز، إلخ)
- صلاحية العينة للفحص
- نتيجة الفحص
- التشخيص

#### قسم صحة الخيول
**البيانات المطلوبة:**
- عدد الخيول (الكلي، الصغار، الإناث)
- نوع الفحص الصحي
- الحالة الصحية
- التشخيص
- العلاج المقدم
- التطعيمات (إن وجدت)
- مكافحة الطفيليات (إن وجدت)
- الفحوصات المخبرية (إن وجدت)

### 3. نظام الصلاحيات

#### الأدوار (Roles):
1. **Super Admin** - صلاحية كاملة على جميع الأقسام
2. **Parasite Control Supervisor** - مشرف قسم مكافحة الطفيليات
3. **Vaccination Supervisor** - مشرف قسم التطعيم
4. **Treatment Supervisor** - مشرف قسم المراقبة والعلاج
5. **Lab Supervisor** - مشرف قسم المختبرات
6. **Horse Health Supervisor** - مشرف قسم صحة الخيول
7. **Team Member** - عضو فريق

#### القيود:
- كل مشرف قسم يمكنه فقط إدخال وتعديل البيانات الخاصة بقسمه
- Super Admin يمكنه الوصول لجميع الأقسام

### 4. الفرق (Teams)
كل فريق يحتوي على:
- مشرف الفريق (supervisor)
- القسم التابع له (department)
- رقم المركبة (vehicle_no)
- رمز القسم (أول حرف من اسم الخدمة)

## API Endpoints

### المربيين (Clients)

```
POST   /clients/add                    - إضافة مربي جديد
POST   /clients/bulk-upload            - رفع عدد كبير من المربيين
POST   /clients/:clientId/add-village  - إضافة قرية للمربي
POST   /clients/:clientId/add-service  - إضافة خدمة للمربي
GET    /clients                        - الحصول على جميع المربيين
GET    /clients/search                 - البحث بالقرية أو اسم المربي
GET    /clients/:clientId              - الحصول على مربي واحد
PUT    /clients/:clientId              - تحديث بيانات المربي
DELETE /clients/:clientId              - حذف مربي
```

### مكافحة الطفيليات

```
POST   /parasite-control/create        - إنشاء تقرير جديد
GET    /parasite-control               - الحصول على جميع التقارير
GET    /parasite-control/stats         - إحصائيات
GET    /parasite-control/filter        - فلترة التقارير
GET    /parasite-control/:reportId     - الحصول على تقرير واحد
PUT    /parasite-control/:reportId     - تحديث تقرير
DELETE /parasite-control/:reportId     - حذف تقرير
```

### التطعيم

```
POST   /vaccination/create             - إنشاء تقرير جديد
GET    /vaccination                    - الحصول على جميع التقارير
GET    /vaccination/stats              - إحصائيات
GET    /vaccination/filter             - فلترة التقارير
GET    /vaccination/:reportId          - الحصول على تقرير واحد
PUT    /vaccination/:reportId          - تحديث تقرير
DELETE /vaccination/:reportId          - حذف تقرير
```

### المراقبة والعلاج

```
POST   /treatment/create               - إنشاء تقرير جديد
GET    /treatment                      - الحصول على جميع التقارير
GET    /treatment/stats                - إحصائيات
GET    /treatment/filter               - فلترة التقارير
GET    /treatment/:reportId            - الحصول على تقرير واحد
PUT    /treatment/:reportId            - تحديث تقرير
DELETE /treatment/:reportId            - حذف تقرير
```

### المختبرات

```
POST   /lab/create                     - إنشاء تقرير جديد
GET    /lab                            - الحصول على جميع التقارير
GET    /lab/stats                      - إحصائيات
GET    /lab/filter                     - فلترة التقارير
GET    /lab/sample/:sampleCode         - البحث بكود العينة
GET    /lab/:reportId                  - الحصول على تقرير واحد
PUT    /lab/:reportId                  - تحديث تقرير
DELETE /lab/:reportId                  - حذف تقرير
```

### صحة الخيول

```
POST   /horse-health/create            - إنشاء تقرير جديد
GET    /horse-health                   - الحصول على جميع التقارير
GET    /horse-health/stats             - إحصائيات
GET    /horse-health/comprehensive     - تقرير شامل
GET    /horse-health/filter            - فلترة التقارير
GET    /horse-health/:reportId         - الحصول على تقرير واحد
PUT    /horse-health/:reportId         - تحديث تقرير
DELETE /horse-health/:reportId         - حذف تقرير
```

## الفلترة والتقارير

### فلترة حسب التاريخ
جميع endpoints الخاصة بالفلترة تدعم:
- `startDate` - تاريخ البداية
- `endDate` - تاريخ النهاية
- `clientId` - معرف المربي

### الإحصائيات
كل قسم يوفر endpoint للإحصائيات يعرض:
- عدد المربيين الذين تلقوا الخدمة
- إجمالي التقارير
- إحصائيات خاصة بكل قسم (عدد المعالجين، المحصنين، إلخ)

## أمثلة الاستخدام

### إضافة مربي جديد

```json
POST /clients/add
{
  "name": "أحمد محمد",
  "national_id": "1234567890",
  "birth_date": "1980-01-01",
  "phone": "0501234567",
  "villages": [
    {
      "name": "القرية الأولى",
      "n_coordinate": 26.738551,
      "e_coordinate": 37.840469
    }
  ]
}
```

### رفع عدد كبير من المربيين

```json
POST /clients/bulk-upload
{
  "clients": [
    {
      "name": "مربي 1",
      "national_id": "1111111111",
      "phone": "0501111111",
      "villages": [...]
    },
    {
      "name": "مربي 2",
      "national_id": "2222222222",
      "phone": "0502222222",
      "villages": [...]
    }
  ]
}
```

### إنشاء تقرير مكافحة طفيليات

```json
POST /parasite-control/create
{
  "serial_no": "PC-001",
  "service_request": "serviceRequestId",
  "client": "clientId",
  "team": "teamId",
  "report_date": "2025-10-01",
  "herd_information": {
    "total_sheep": 100,
    "young_sheep": 20,
    "female_sheep": 60,
    "treated_sheep": 95
  },
  "insecticides_used": [
    {
      "type": "مبيد A",
      "category": "فئة 1",
      "quantity": 10
    }
  ],
  "herd_health_status": "Healthy",
  "remarks": "تم العلاج بنجاح"
}
```

### فلترة التقارير حسب التاريخ

```
GET /parasite-control/filter?startDate=2025-09-01&endDate=2025-10-01&clientId=clientId
```

### الحصول على إحصائيات

```
GET /parasite-control/stats?startDate=2025-09-01&endDate=2025-10-01
```

## ملاحظات مهمة

1. **التحقق من الصلاحيات**: جميع endpoints محمية بـ `isAuth` middleware
2. **عدم البحث بـ client_id**: لا يوجد بحث بمعرف العميل مباشرة، استخدم البحث بالاسم أو القرية
3. **تكرار المربي في العلاج**: يمكن تكرار نفس المربي أكثر من مرة في نفس اليوم في قسم العلاج
4. **الخدمات بدون أسعار**: الخدمات تُعرض للمربي بدون أسعار
5. **حد أقصى 3 مواقع**: كل مربي يمكنه إضافة حتى 3 مواقع فقط

## المساهمة
للمساهمة في المشروع، يرجى اتباع الخطوات التالية:
1. Fork المشروع
2. إنشاء branch جديد
3. Commit التغييرات
4. Push إلى الـ branch
5. فتح Pull Request

## الترخيص
هذا المشروع مرخص تحت رخصة MIT
