import { Router } from "express";
import * as labController from "./lab.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = Router();

router.post('/create', isAuth, labController.createLabReport);
router.get('/', isAuth, labController.getAllLabReports);
router.get('/stats', isAuth, labController.getLabStats);
router.get('/filter', isAuth, labController.filterLabReports);
router.get('/sample/:sampleCode', isAuth, labController.getLabReportBySampleCode);
router.get('/:reportId', isAuth, labController.getLabReportById);
router.put('/:reportId', isAuth, labController.updateLabReport);
router.delete('/:reportId', isAuth, labController.deleteLabReport);

export default router;
