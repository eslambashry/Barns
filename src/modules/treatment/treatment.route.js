import { Router } from "express";
import * as treatmentController from "./treatment.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = Router();

router.post('/create', isAuth, treatmentController.createTreatmentReport);
router.get('/', isAuth, treatmentController.getAllTreatmentReports);
router.get('/stats', isAuth, treatmentController.getTreatmentStats);
router.get('/filter', isAuth, treatmentController.filterTreatmentReports);
router.get('/:reportId', isAuth, treatmentController.getTreatmentReportById);
router.put('/:reportId', isAuth, treatmentController.updateTreatmentReport);
router.delete('/:reportId', isAuth, treatmentController.deleteTreatmentReport);

export default router;
