import { Router } from "express";
import * as horseHealthController from "./horseHealth.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = Router();

router.post('/create', isAuth, horseHealthController.createReport);
router.get('/', isAuth, horseHealthController.getAllReports);
router.get('/stats', isAuth, horseHealthController.getStats);
router.get('/filter', isAuth, horseHealthController.filterReports);
router.get('/:reportId', isAuth, horseHealthController.getReportById);
router.put('/:reportId', isAuth, horseHealthController.updateReport);
router.delete('/:reportId', isAuth, horseHealthController.deleteReport);

export default router;
