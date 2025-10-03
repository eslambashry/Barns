import { Router } from "express";
import * as parasiteControlController from "./parasiteControl.controller.js";

const router = Router();

router.post('/create', parasiteControlController.createReport);
router.get('/', parasiteControlController.getAllReports);
router.get('/stats', parasiteControlController.getStats);
router.get('/filter', parasiteControlController.filterReports);
router.get('/:reportId', parasiteControlController.getReportById);
router.put('/:reportId', parasiteControlController.updateReport);
router.delete('/:reportId', parasiteControlController.deleteReport);

export default router;