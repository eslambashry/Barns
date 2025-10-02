import { Client } from "../../database/models/client.schema.js";
import { asyncHandler } from "../../utilities/errorHandeling.js";

// إضافة مربي جديد
export const addClient = asyncHandler(async (req, res, next) => {
    const { name, national_id, birth_date, phone, email, village, longitude, latitude, detailed_address, status, animals, available_services } = req.body;

    // التحقق من عدم وجود نفس الهوية مسبقاً
    const existingClient = await Client.findOne({ national_id });
    if (existingClient) {
        return res.status(400).json({
            success: false,
            message: 'المربي بهذه الهوية موجود مسبقاً'
        });
    }

    // إنشاء المربي الجديد
    const newClient = await Client.create({
        name,
        national_id,
        birth_date,
        phone,
        email,
        village,
        longitude,
        latitude,
        detailed_address,
        status: status || 'نشط',
        animals: animals || [],
        available_services: available_services || ['Parasite Control', 'Vaccination', 'Treatment & Monitoring', 'Lab Test', 'Horse Health']
    });

    res.status(201).json({
        success: true,
        message: 'تم إضافة المربي بنجاح',
        data: newClient,
        created_at: newClient.createdAt
    });
});

// إضافة حيوان جديد للمربي
export const addAnimalToClient = asyncHandler(async (req, res, next) => {
    const { clientId } = req.params;
    const { animal_type, breed, age, animal_count, gender, health_status, identification_number } = req.body;

    const client = await Client.findById(clientId);
    if (!client) {
        return res.status(404).json({
            success: false,
            message: 'المربي غير موجود'
        });
    }

    client.animals.push({
        animal_type,
        breed,
        age,
        animal_count: animal_count || 1,
        gender,
        health_status: health_status || 'سليم',
        identification_number
    });
    
    await client.save();

    res.status(200).json({
        success: true,
        message: 'تم إضافة الحيوان بنجاح',
        data: client
    });
});

// الحصول على جميع المربيين
export const getAllClients = asyncHandler(async (req, res, next) => {
    const { page = 1, limit = 50 } = req.query;
    
    const skip = (page - 1) * limit;
    
    // Use lean() for better performance and add timeout
    const clients = await Client.find()
        .select('-__v')
        .lean()
        .skip(skip)
        .limit(parseInt(limit))
        .maxTimeMS(5000); // 5 second timeout
    
    const total = await Client.countDocuments();

    res.status(200).json({
        success: true,
        count: clients.length,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / limit),
        data: clients
    });
});

// الحصول على مربي واحد
export const getClientById = asyncHandler(async (req, res, next) => {
    const { clientId } = req.params;

    const client = await Client.findById(clientId);
    if (!client) {
        return res.status(404).json({
            success: false,
            message: 'المربي غير موجود'
        });
    }

    res.status(200).json({
        success: true,
        data: client
    });
});

// البحث بالقرية أو اسم المربي
export const searchClients = asyncHandler(async (req, res, next) => {
    const { village, name, status } = req.query;

    let query = {};

    if (village) {
        query.village = village;
    }

    if (name) {
        query.name = { $regex: name, $options: 'i' };
    }

    if (status) {
        query.status = status;
    }

    const clients = await Client.find(query);

    res.status(200).json({
        success: true,
        count: clients.length,
        data: clients
    });
});

// تحديث بيانات المربي
export const updateClient = asyncHandler(async (req, res, next) => {
    const { clientId } = req.params;
    const updateData = req.body;

    // منع تحديث الهوية الوطنية
    delete updateData.national_id;

    const client = await Client.findByIdAndUpdate(
        clientId,
        updateData,
        { new: true, runValidators: true }
    );

    if (!client) {
        return res.status(404).json({
            success: false,
            message: 'المربي غير موجود'
        });
    }

    res.status(200).json({
        success: true,
        message: 'تم تحديث بيانات المربي بنجاح',
        data: client
    });
});

// حذف مربي
export const deleteClient = asyncHandler(async (req, res, next) => {
    const { clientId } = req.params;

    const client = await Client.findByIdAndDelete(clientId);
    if (!client) {
        return res.status(404).json({
            success: false,
            message: 'المربي غير موجود'
        });
    }

    res.status(200).json({
        success: true,
        message: 'تم حذف المربي بنجاح'
    });
});

// رفع عدد كبير من المربيين (Bulk Upload)
export const bulkUploadClients = asyncHandler(async (req, res, next) => {
    const { clients } = req.body;

    if (!Array.isArray(clients) || clients.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'يجب إرسال مصفوفة من المربيين'
        });
    }

    const results = {
        success: [],
        failed: []
    };

    for (const clientData of clients) {
        try {
            // التحقق من عدم وجود نفس الهوية
            const existingClient = await Client.findOne({ national_id: clientData.national_id });
            if (existingClient) {
                results.failed.push({
                    data: clientData,
                    error: 'المربي بهذه الهوية موجود مسبقاً'
                });
                continue;
            }

            // إضافة الخدمات المتاحة افتراضياً إذا لم تكن موجودة
            if (!clientData.available_services) {
                clientData.available_services = ['Parasite Control', 'Vaccination', 'Treatment & Monitoring', 'Lab Test', 'Horse Health'];
            }

            const newClient = await Client.create(clientData);
            results.success.push(newClient);
        } catch (error) {
            results.failed.push({
                data: clientData,
                error: error.message
            });
        }
    }

    res.status(200).json({
        success: true,
        message: `تم إضافة ${results.success.length} مربي بنجاح، فشل ${results.failed.length}`,
        data: results
    });
});

// إضافة خدمة للمربي
export const addServiceToClient = asyncHandler(async (req, res, next) => {
    const { clientId } = req.params;
    const { service } = req.body;

    const validServices = ['Parasite Control', 'Vaccination', 'Treatment & Monitoring', 'Lab Test', 'Horse Health'];
    
    if (!validServices.includes(service)) {
        return res.status(400).json({
            success: false,
            message: 'الخدمة غير صحيحة'
        });
    }

    const client = await Client.findById(clientId);
    if (!client) {
        return res.status(404).json({
            success: false,
            message: 'المربي غير موجود'
        });
    }

    if (client.available_services.includes(service)) {
        return res.status(400).json({
            success: false,
            message: 'الخدمة موجودة مسبقاً للمربي'
        });
    }

    client.available_services.push(service);
    await client.save();

    res.status(200).json({
        success: true,
        message: 'تم إضافة الخدمة بنجاح',
        data: client
    });
});

// تحديث حيوان
export const updateAnimal = asyncHandler(async (req, res, next) => {
    const { clientId, animalId } = req.params;
    const updateData = req.body;

    const client = await Client.findById(clientId);
    if (!client) {
        return res.status(404).json({
            success: false,
            message: 'المربي غير موجود'
        });
    }

    const animal = client.animals.id(animalId);
    if (!animal) {
        return res.status(404).json({
            success: false,
            message: 'الحيوان غير موجود'
        });
    }

    // تحديث بيانات الحيوان
    Object.assign(animal, updateData);
    await client.save();

    res.status(200).json({
        success: true,
        message: 'تم تحديث بيانات الحيوان بنجاح',
        data: client
    });
});

// حذف حيوان
export const deleteAnimal = asyncHandler(async (req, res, next) => {
    const { clientId, animalId } = req.params;

    const client = await Client.findById(clientId);
    if (!client) {
        return res.status(404).json({
            success: false,
            message: 'المربي غير موجود'
        });
    }

    const animal = client.animals.id(animalId);
    if (!animal) {
        return res.status(404).json({
            success: false,
            message: 'الحيوان غير موجود'
        });
    }

    animal.deleteOne();
    await client.save();

    res.status(200).json({
        success: true,
        message: 'تم حذف الحيوان بنجاح',
        data: client
    });
});

// الحصول على مربيين حسب القرية
export const getClientsByVillage = asyncHandler(async (req, res, next) => {
    const { village } = req.params;

    const clients = await Client.find({ village });

    res.status(200).json({
        success: true,
        count: clients.length,
        data: clients
    });
});

// الحصول على إحصائيات المربيين
export const getClientsStats = asyncHandler(async (req, res, next) => {
    const totalClients = await Client.countDocuments();
    const activeClients = await Client.countDocuments({ status: 'نشط' });
    const inactiveClients = await Client.countDocuments({ status: 'غير نشط' });

    // إحصائيات الحيوانات
    const clientsWithAnimals = await Client.find({}, 'animals');
    let totalAnimals = 0;
    const animalsByType = {
        'أغنام': 0,
        'ماعز': 0,
        'أبقار': 0,
        'إبل': 0,
        'خيول': 0
    };

    clientsWithAnimals.forEach(client => {
        totalAnimals += client.animals.length;
        client.animals.forEach(animal => {
            if (animalsByType[animal.animal_type] !== undefined) {
                animalsByType[animal.animal_type]++;
            }
        });
    });

    // إحصائيات القرى
    const clientsByVillage = await Client.aggregate([
        {
            $group: {
                _id: '$village',
                count: { $sum: 1 }
            }
        }
    ]);

    res.status(200).json({
        success: true,
        data: {
            totalClients,
            activeClients,
            inactiveClients,
            totalAnimals,
            animalsByType,
            clientsByVillage
        }
    });
});


 