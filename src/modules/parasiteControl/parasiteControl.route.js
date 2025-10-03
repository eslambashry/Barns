import { Router } from "express";
import * as parasiteControlController from "./parasiteControl.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = Router();

// إنشاء تقرير
router.post('/create', isAuth, parasiteControlController.createReport);

// الحصول على جميع التقارير
router.get('/', isAuth, parasiteControlController.getAllReports);

// الحصول على إحصائيات
router.get('/stats', isAuth, parasiteControlController.getStats);

// فلترة التقارير
router.get('/filter', isAuth, parasiteControlController.filterReports);

// الحصول على تقرير واحد
router.get('/:reportId', isAuth, parasiteControlController.getReportById);

// تحديث تقرير
router.put('/:reportId', isAuth, parasiteControlController.updateReport);

// حذف تقرير
router.delete('/:reportId', isAuth, parasiteControlController.deleteReport);

export default router;
