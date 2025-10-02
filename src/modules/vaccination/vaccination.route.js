import { Router } from "express";
import * as vaccinationController from "./vaccination.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = Router();

router.post('/create', isAuth, vaccinationController.createVaccinationReport);
router.get('/', isAuth, vaccinationController.getAllVaccinationReports);
router.get('/stats', isAuth, vaccinationController.getVaccinationStats);
router.get('/filter', isAuth, vaccinationController.filterVaccinationReports);
router.get('/:reportId', isAuth, vaccinationController.getVaccinationReportById);
router.put('/:reportId', isAuth, vaccinationController.updateVaccinationReport);
router.delete('/:reportId', isAuth, vaccinationController.deleteVaccinationReport);

export default router;
