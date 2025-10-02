import { Router } from "express";
import * as parasiteControlController from "./parasiteControl.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = Router();

// إنشاء تقرير جديد
router.post('/create', isAuth, parasiteControlController.createParasiteControlReport);

// الحصول على جميع التقارير
router.get('/', isAuth, parasiteControlController.getAllParasiteControlReports);

// الحصول على إحصائيات
router.get('/stats', isAuth, parasiteControlController.getParasiteControlStats);

// فلترة التقارير
router.get('/filter', isAuth, parasiteControlController.filterParasiteControlReports);

// الحصول على تقرير واحد
router.get('/:reportId', isAuth, parasiteControlController.getParasiteControlReportById);

// تحديث تقرير
router.put('/:reportId', isAuth, parasiteControlController.updateParasiteControlReport);

// حذف تقرير
router.delete('/:reportId', isAuth, parasiteControlController.deleteParasiteControlReport);

export default router;
