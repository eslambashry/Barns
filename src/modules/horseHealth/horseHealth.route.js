import { Router } from "express";
import * as horseHealthController from "./horseHealth.controller.js";

const router = Router();

router.post('/create', horseHealthController.createReport);
router.get('/', horseHealthController.getAllReports);
router.get('/stats', horseHealthController.getStats);
router.get('/filter', horseHealthController.filterReports);
router.get('/:reportId', horseHealthController.getReportById);
router.put('/:reportId', horseHealthController.updateReport);
router.delete('/:reportId', horseHealthController.deleteReport);

export default router;
