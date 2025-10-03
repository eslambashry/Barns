import { Router } from "express";
import * as treatmentController from "./treatment.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = Router();

router.post('/create', isAuth, treatmentController.createReport);
router.get('/', isAuth, treatmentController.getAllReports);
router.get('/stats', isAuth, treatmentController.getStats);
router.get('/filter', isAuth, treatmentController.filterReports);
router.get('/:reportId', isAuth, treatmentController.getReportById);
router.put('/:reportId', isAuth, treatmentController.updateReport);
router.delete('/:reportId', isAuth, treatmentController.deleteReport);

export default router;
