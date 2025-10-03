# أمثلة Requests - نظام إدارة الخدمات البيطرية

## 📋 جدول المحتويات
1. [المربيين (Clients)](#1-المربيين-clients)
2. [مكافحة الطفيليات (Parasite Control)](#2-مكافحة-الطفيليات-parasite-control)
3. [التطعيم (Vaccination)](#3-التطعيم-vaccination)
4. [العلاج (Treatment)](#4-العلاج-treatment)
5. [المختبر (Laboratory)](#5-المختبر-laboratory)
6. [صحة الخيول (Horse Health)](#6-صحة-الخيول-horse-health)

---

## 1. المربيين (Clients)

### إضافة مربي جديد
```http
POST http://localhost:3000/clients/add
Content-Type: application/json

{
  "name": "أحمد محمد علي السعيد",
  "national_id": "1234567890",
  "birth_date": "1980-05-15",
  "phone": "0501234567",
  "village": "قرية النور",
  "longitude": 46.6753,
  "latitude": 24.7136,
  "detailed_address": "حي الزهور، شارع الملك فيصل، منزل رقم 25",
  "available_services": [
    "Parasite Control",
    "Vaccination",
    "Treatment & Monitoring",
    "Lab Test",
    "Horse Health"
  ]
}
```

### الحصول على جميع المربيين
```http
GET http://localhost:3000/clients?page=1&limit=50
```

### البحث عن مربي
```http
GET http://localhost:3000/clients/search?village=قرية النور&name=أحمد
```

### الحصول على مربيين حسب القرية
```http
GET http://localhost:3000/clients/by-village/قرية النور
```

### إحصائيات المربيين
```http
GET http://localhost:3000/clients/stats
```

---

## 2. مكافحة الطفيليات (Parasite Control)

### إنشاء تقرير مكافحة طفيليات
```http
POST http://localhost:3000/parasite-control/create
Content-Type: application/json

{
  "serial_no": "PC-2025-001",
  "date": "2025-10-03",
  "owner_name": "أحمد محمد علي السعيد",
  "owner_id": "1234567890",
  "owner_birthdate": "1980-05-15",
  "owner_phone": "0501234567",
  "herd_location": "قرية النور - المزرعة الشمالية",
  "coordinate_e": 46.6753,
  "coordinate_n": 24.7136,
  "supervisor": "د. خالد أحمد",
  "vehicle_no": "ABC-1234",
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
  "insecticide_type": "سايبرمثرين 10%",
  "insecticide_volume_ml": 15500,
  "insecticide_category": "مبيدات البيرثرويد",
  "insecticide_status": "تم الرش بنجاح",
  "animal_barn_size_sqm": 500,
  "breeding_sites": "حظائر مغلقة",
  "parasite_control_volume": 25000,
  "parasite_control_status": "مكتمل",
  "herd_health_status": "سليم",
  "complying_to_instructions": true,
  "request_date": "2025-10-01",
  "request_situation": "Closed",
  "request_fulfilling_date": "2025-10-03",
  "remarks": "تم الرش بنجاح. القطيع في حالة صحية ممتازة. يُنصح بإعادة الرش بعد 3 أسابيع."
}
```

### مثال 2: قطيع أغنام فقط
```json
{
  "serial_no": "PC-2025-002",
  "date": "2025-10-03",
  "owner_name": "محمد عبدالله",
  "owner_id": "9876543210",
  "owner_phone": "0509876543",
  "herd_location": "قرية السلام",
  "coordinate_e": 46.7,
  "coordinate_n": 24.8,
  "supervisor": "د. علي حسن",
  "vehicle_no": "XYZ-5678",
  "total_sheep": 200,
  "young_sheep": 40,
  "female_sheep": 120,
  "treated_sheep": 195,
  "total_goats": 0,
  "total_camel": 0,
  "total_cattle": 0,
  "insecticide_type": "إيفرمكتين 1%",
  "insecticide_volume_ml": 20000,
  "insecticide_category": "مبيدات الأفرمكتين",
  "herd_health_status": "سليم",
  "complying_to_instructions": true,
  "request_situation": "Closed",
  "remarks": "قطيع أغنام فقط. تم الرش بنجاح."
}
```

### الحصول على جميع التقارير
```http
GET http://localhost:3000/parasite-control?page=1&limit=50
```

### فلترة التقارير
```http
GET http://localhost:3000/parasite-control/filter?startDate=2025-10-01&endDate=2025-10-31&owner_id=1234567890
```

### إحصائيات
```http
GET http://localhost:3000/parasite-control/stats?startDate=2025-10-01&endDate=2025-10-31
```

---

## 3. التطعيم (Vaccination)

### إنشاء تقرير تطعيم
```http
POST http://localhost:3000/vaccination/create
Content-Type: application/json

{
  "serial_no": "VAC-2025-001",
  "date": "2025-10-03",
  "owner_name": "أحمد محمد علي السعيد",
  "owner_id": "1234567890",
  "owner_birthdate": "1980-05-15",
  "owner_phone": "0501234567",
  "farm_location": "قرية النور - المزرعة الشمالية",
  "coordinate_e": 46.6753,
  "coordinate_n": 24.7136,
  "supervisor": "د. خالد أحمد",
  "team": "فريق التطعيم رقم 1",
  "total_sheep": 150,
  "female_sheep": 90,
  "vaccinated_sheep": 145,
  "total_goats": 80,
  "female_goats": 50,
  "vaccinated_goats": 75,
  "total_camel": 20,
  "female_camel": 12,
  "vaccinated_camel": 18,
  "total_cattle": 10,
  "female_cattle": 6,
  "vaccinated_cattle": 10,
  "herd_health": "سليم",
  "animal_handling": "سهل",
  "labours": "متوفرة",
  "reachable_location": "سهل الوصول",
  "request_date": "2025-10-01",
  "request_situation": "Closed",
  "request_fulfilling_date": "2025-10-03",
  "vaccine_type": "HS, SG-Pox, PPR",
  "vaccine_category": "لقاحات إجبارية",
  "remarks": "تم التطعيم بنجاح. جميع الحيوانات تعاونت بشكل جيد."
}
```

### مثال 2: تطعيم إبل
```json
{
  "serial_no": "VAC-2025-002",
  "date": "2025-10-03",
  "owner_name": "سعد بن فهد",
  "owner_id": "5555555555",
  "owner_phone": "0505555555",
  "farm_location": "قرية الخير",
  "coordinate_e": 46.8,
  "coordinate_n": 24.9,
  "supervisor": "د. محمد سالم",
  "team": "فريق التطعيم رقم 2",
  "total_sheep": 0,
  "total_goats": 0,
  "total_camel": 50,
  "female_camel": 30,
  "vaccinated_camel": 48,
  "total_cattle": 0,
  "herd_health": "سليم",
  "animal_handling": "متوسط",
  "labours": "متوفرة",
  "reachable_location": "متوسط",
  "vaccine_type": "FMD, PPR",
  "vaccine_category": "لقاحات إجبارية",
  "request_situation": "Closed",
  "remarks": "تطعيم قطيع إبل. تم بنجاح."
}
```

### الحصول على جميع التقارير
```http
GET http://localhost:3000/vaccination?page=1&limit=50
```

### فلترة التقارير
```http
GET http://localhost:3000/vaccination/filter?startDate=2025-10-01&endDate=2025-10-31&owner_id=1234567890
```

---

## 4. العلاج (Treatment)

### إنشاء تقرير علاج
```http
POST http://localhost:3000/treatment/create
Content-Type: application/json

{
  "serial_no": "TRT-2025-001",
  "date": "2025-10-03",
  "owner_name": "أحمد محمد علي السعيد",
  "owner_id": "1234567890",
  "owner_birthdate": "1980-05-15",
  "owner_phone": "0501234567",
  "farm_location": "قرية النور - المزرعة الشمالية",
  "coordinate_n": 24.7136,
  "coordinate_e": 46.6753,
  "supervisor": "د. خالد أحمد",
  "vehicle_no": "TRT-1234",
  "total_sheep": 10,
  "total_goats": 5,
  "total_camel": 2,
  "total_horse": 0,
  "total_cattle": 3,
  "diagnosis": "إسهال بكتيري",
  "intervention_category": "Clinical Examination",
  "treatment": "مضاد حيوي (أوكسي تتراسايكلين) + محلول معالجة الجفاف",
  "request_date": "2025-10-03",
  "request_status": "Closed",
  "request_fulfilling_date": "2025-10-03",
  "remarks": "تم فحص الحيوانات المريضة وإعطاء العلاج المناسب. يُنصح بالمتابعة بعد 3 أيام."
}
```

### مثال 2: حالة طوارئ
```json
{
  "serial_no": "TRT-2025-002",
  "date": "2025-10-03",
  "owner_name": "محمد عبدالله",
  "owner_id": "9876543210",
  "owner_phone": "0509876543",
  "farm_location": "قرية السلام",
  "coordinate_n": 24.8,
  "coordinate_e": 46.7,
  "supervisor": "د. علي حسن",
  "vehicle_no": "TRT-5678",
  "total_sheep": 1,
  "total_goats": 0,
  "total_camel": 0,
  "total_horse": 0,
  "total_cattle": 0,
  "diagnosis": "كسر في الساق الأمامية",
  "intervention_category": "Emergency Treatment",
  "treatment": "تجبير + مسكن ألم + مضاد التهاب",
  "request_status": "Closed",
  "remarks": "حالة طوارئ. تم التعامل معها فوراً."
}
```

### مثال 3: علاج جماعي
```json
{
  "serial_no": "TRT-2025-003",
  "date": "2025-10-03",
  "owner_name": "سعد بن فهد",
  "owner_id": "5555555555",
  "owner_phone": "0505555555",
  "farm_location": "قرية الخير",
  "coordinate_n": 24.9,
  "coordinate_e": 46.8,
  "supervisor": "د. محمد سالم",
  "vehicle_no": "TRT-9999",
  "total_sheep": 50,
  "total_goats": 30,
  "total_camel": 0,
  "total_horse": 0,
  "total_cattle": 0,
  "diagnosis": "طفيليات داخلية",
  "intervention_category": "Mass Treatment",
  "treatment": "إيفرمكتين 1% للقطيع بالكامل",
  "request_status": "Closed",
  "remarks": "علاج جماعي للقطيع. تم بنجاح."
}
```

### الحصول على جميع التقارير
```http
GET http://localhost:3000/treatment?page=1&limit=50
```

### فلترة التقارير
```http
GET http://localhost:3000/treatment/filter?startDate=2025-10-01&endDate=2025-10-31&diagnosis=إسهال
```

---

## 5. المختبر (Laboratory)

### إنشاء تقرير مختبر
```http
POST http://localhost:3000/lab/create
Content-Type: application/json

{
  "serial_no": "LAB-2025-001",
  "date": "2025-10-03",
  "sample_code": "SMP-2025-001",
  "owner_name": "أحمد محمد علي السعيد",
  "owner_id": "1234567890",
  "owner_birthdate": "1980-05-15",
  "owner_phone": "0501234567",
  "location": "قرية النور - المزرعة الشمالية",
  "coordinate_n": 24.7136,
  "coordinate_e": 46.6753,
  "total_sheep": 150,
  "total_goats": 80,
  "total_camel": 20,
  "total_horse": 0,
  "total_cattle": 10,
  "other_species": "",
  "sample_collector": "د. خالد أحمد",
  "sample_type": "Blood",
  "samples_number": 10,
  "positive_cases": 2,
  "negative_cases": 8,
  "remarks": "تم أخذ عينات دم من 10 حيوانات للفحص. النتائج: 2 إيجابية، 8 سلبية."
}
```

### مثال 2: عينات براز
```json
{
  "serial_no": "LAB-2025-002",
  "date": "2025-10-03",
  "sample_code": "SMP-2025-002",
  "owner_name": "محمد عبدالله",
  "owner_id": "9876543210",
  "owner_phone": "0509876543",
  "location": "قرية السلام",
  "coordinate_n": 24.8,
  "coordinate_e": 46.7,
  "total_sheep": 200,
  "total_goats": 0,
  "total_camel": 0,
  "total_horse": 0,
  "total_cattle": 0,
  "sample_collector": "د. علي حسن",
  "sample_type": "Feces",
  "samples_number": 15,
  "positive_cases": 5,
  "negative_cases": 10,
  "remarks": "فحص طفيليات داخلية. تم اكتشاف 5 حالات إيجابية."
}
```

### مثال 3: عينات حليب
```json
{
  "serial_no": "LAB-2025-003",
  "date": "2025-10-03",
  "sample_code": "SMP-2025-003",
  "owner_name": "سعد بن فهد",
  "owner_id": "5555555555",
  "owner_phone": "0505555555",
  "location": "قرية الخير",
  "coordinate_n": 24.9,
  "coordinate_e": 46.8,
  "total_sheep": 0,
  "total_goats": 0,
  "total_camel": 50,
  "total_horse": 0,
  "total_cattle": 0,
  "sample_collector": "د. محمد سالم",
  "sample_type": "Milk",
  "samples_number": 20,
  "positive_cases": 0,
  "negative_cases": 20,
  "remarks": "فحص جودة الحليب. جميع العينات سلبية (سليمة)."
}
```

### البحث بكود العينة
```http
GET http://localhost:3000/lab/sample/SMP-2025-001
```

### فلترة التقارير
```http
GET http://localhost:3000/lab/filter?startDate=2025-10-01&endDate=2025-10-31&sample_type=Blood
```

### إحصائيات
```http
GET http://localhost:3000/lab/stats?startDate=2025-10-01&endDate=2025-10-31
```

---

## 6. صحة الخيول (Horse Health)

### إنشاء تقرير صحة خيول
```http
POST http://localhost:3000/horse-health/create
Content-Type: application/json

{
  "serial_no": "HH-2025-001",
  "date": "2025-10-03",
  "owner_name": "خالد بن عبدالعزيز",
  "owner_id": "7777777777",
  "owner_birthdate": "1985-03-25",
  "owner_phone": "0507777777",
  "farm_location": "قرية الفردوس - مزرعة الخيول العربية",
  "coordinate_n": 24.7136,
  "coordinate_e": 46.6753,
  "diagnosis": "فحص دوري شامل",
  "intervention_category": "Routine Check",
  "treatment": "لا يوجد - الحالة الصحية ممتازة",
  "request_date": "2025-10-01",
  "request_status": "Closed",
  "request_fulfilling_date": "2025-10-03",
  "remarks": "فحص صحي دوري لـ 5 خيول. جميعها في حالة صحية ممتازة."
}
```

### مثال 2: علاج خيل
```json
{
  "serial_no": "HH-2025-002",
  "date": "2025-10-03",
  "owner_name": "عبدالرحمن بن سعود",
  "owner_id": "3333333333",
  "owner_phone": "0503333333",
  "farm_location": "قرية الرحمة",
  "coordinate_n": 24.8,
  "coordinate_e": 46.7,
  "diagnosis": "التهاب في الحافر الأمامي الأيسر",
  "intervention_category": "Treatment",
  "treatment": "تنظيف الحافر + مضاد حيوي موضعي + ضماد",
  "request_status": "Closed",
  "remarks": "تم علاج الالتهاب. يُنصح بالمتابعة بعد أسبوع."
}
```

### مثال 3: تطعيم خيول
```json
{
  "serial_no": "HH-2025-003",
  "date": "2025-10-03",
  "owner_name": "فهد بن محمد",
  "owner_id": "8888888888",
  "owner_phone": "0508888888",
  "farm_location": "قرية البركة",
  "coordinate_n": 24.9,
  "coordinate_e": 46.8,
  "diagnosis": "تطعيم سنوي",
  "intervention_category": "Vaccination",
  "treatment": "لقاح الإنفلونزا + لقاح الكزاز",
  "request_status": "Closed",
  "remarks": "تم تطعيم 3 خيول بنجاح."
}
```

### الحصول على جميع التقارير
```http
GET http://localhost:3000/horse-health?page=1&limit=50
```

### فلترة التقارير
```http
GET http://localhost:3000/horse-health/filter?startDate=2025-10-01&endDate=2025-10-31&owner_id=7777777777
```

---

## 📊 القرى المتاحة

```
- قرية النور
- قرية السلام
- قرية الأمل
- قرية الخير
- قرية الفردوس
- قرية الرحمة
- قرية البركة
```

## 🔐 ملاحظات مهمة

1. **جميع الـ requests تحتاج Authentication:**
   ```
   Authorization: Bearer YOUR_TOKEN_HERE
   ```

2. **الحقول المطلوبة (required):**
   - Client: `name`, `national_id`, `phone`, `village`
   - Reports: `serial_no`, `date`, `owner_name`, `owner_id`, `owner_phone`

3. **التواريخ:**
   - Format: `YYYY-MM-DD`
   - Example: `2025-10-03`

4. **الإحداثيات:**
   - `longitude` (coordinate_e): -180 to 180
   - `latitude` (coordinate_n): -90 to 90

5. **Pagination:**
   - Default: `page=1`, `limit=50`
   - Max limit: 100

6. **Serial Numbers:**
   - يجب أن تكون فريدة (unique)
   - Format: `PREFIX-YEAR-NUMBER`
   - Examples: `PC-2025-001`, `VAC-2025-001`, `TRT-2025-001`
