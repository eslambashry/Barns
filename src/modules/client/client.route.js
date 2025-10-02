import { Router } from "express";
import * as clientController from "./client.controller.js";

const clientRouter = Router();

// إضافة مربي جديد
clientRouter.post('/add', clientController.addClient);

// رفع عدد كبير من المربيين
clientRouter.post('/bulk-upload', clientController.bulkUploadClients);

// إضافة حيوان للمربي
clientRouter.post('/:clientId/add-animal', clientController.addAnimalToClient);

// إضافة خدمة للمربي
clientRouter.post('/:clientId/add-service', clientController.addServiceToClient);

// الحصول على جميع المربيين
clientRouter.get('/', clientController.getAllClients);

// الحصول على إحصائيات المربيين
clientRouter.get('/stats', clientController.getClientsStats);

// البحث بالقرية أو اسم المربي
clientRouter.get('/search', clientController.searchClients);

// الحصول على مربيين حسب القرية
clientRouter.get('/by-village/:village', clientController.getClientsByVillage);

// الحصول على مربي واحد
clientRouter.get('/:clientId', clientController.getClientById);

// تحديث بيانات المربي
clientRouter.put('/:clientId', clientController.updateClient);

// تحديث حيوان
clientRouter.put('/:clientId/animals/:animalId', clientController.updateAnimal);

// حذف حيوان
clientRouter.delete('/:clientId/animals/:animalId', clientController.deleteAnimal);

// حذف مربي
clientRouter.delete('/:clientId', clientController.deleteClient);

export default clientRouter;
