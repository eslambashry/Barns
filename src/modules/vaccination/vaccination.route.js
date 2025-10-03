import { Router } from "express";
import * as vaccinationController from "./vaccination.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = Router();

router.post('/create', isAuth, vaccinationController.createReport);
router.get('/', isAuth, vaccinationController.getAllReports);
router.get('/stats', isAuth, vaccinationController.getStats);
router.get('/filter', isAuth, vaccinationController.filterReports);
router.get('/:reportId', isAuth, vaccinationController.getReportById);
router.put('/:reportId', isAuth, vaccinationController.updateReport);
router.delete('/:reportId', isAuth, vaccinationController.deleteReport);

export default router;
