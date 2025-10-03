import { Router } from "express";
import * as clientController from "./client.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const clientRouter = Router();

// إضافة مربي جديد
clientRouter.post('/add', isAuth, clientController.addClient);

// رفع عدد كبير من المربيين
clientRouter.post('/bulk-upload', isAuth, clientController.bulkUploadClients);

// إضافة خدمة للمربي
clientRouter.post('/:clientId/add-service', isAuth, clientController.addServiceToClient);

// الحصول على جميع المربيين
clientRouter.get('/', isAuth, clientController.getAllClients);

// الحصول على إحصائيات المربيين
clientRouter.get('/stats', isAuth, clientController.getClientsStats);

// البحث بالقرية أو اسم المربي
clientRouter.get('/search', isAuth, clientController.searchClients);

// الحصول على مربيين حسب القرية
clientRouter.get('/by-village/:village', isAuth, clientController.getClientsByVillage);

// الحصول على مربي واحد
clientRouter.get('/:clientId', isAuth, clientController.getClientById);

// تحديث بيانات المربي
clientRouter.put('/:clientId', isAuth, clientController.updateClient);

// حذف مربي
clientRouter.delete('/:clientId', isAuth, clientController.deleteClient);

export default clientRouter;
