import { Router } from "express";
import * as treatmentController from "./treatment.controller.js";

const router = Router();

router.post('/create', treatmentController.createReport);
router.get('/', treatmentController.getAllReports);
router.get('/stats', treatmentController.getStats);
router.get('/filter', treatmentController.filterReports);
router.get('/:reportId', treatmentController.getReportById);
router.put('/:reportId', treatmentController.updateReport);
router.delete('/:reportId', treatmentController.deleteReport);

export default router;
