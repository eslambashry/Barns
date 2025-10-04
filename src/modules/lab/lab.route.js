import { Router } from "express";
import * as labController from "./lab.controller.js";

const router = Router();

router.post('/create', labController.createReport);
router.get('/', labController.getAllReports);
router.get('/stats', labController.getStats);
router.get('/filter', labController.filterReports);
router.get('/sample/:sampleCode', labController.getBySampleCode);
router.get('/:reportId', labController.getReportById);
router.put('/:reportId', labController.updateReport);
router.delete('/:reportId', labController.deleteReport);

export default router;