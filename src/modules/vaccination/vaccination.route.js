import { Router } from "express";
import * as vaccinationController from "./vaccination.controller.js";

const router = Router();

router.post('/create', vaccinationController.createReport);
router.get('/', vaccinationController.getAllReports);
router.get('/stats', vaccinationController.getStats);
router.get('/filter', vaccinationController.filterReports);
router.get('/:reportId', vaccinationController.getReportById);
router.put('/:reportId', vaccinationController.updateReport);
router.delete('/:reportId', vaccinationController.deleteReport);

export default router;
