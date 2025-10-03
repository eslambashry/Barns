import { Router } from "express";
import * as labController from "./lab.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = Router();

router.post('/create', isAuth, labController.createReport);
router.get('/', isAuth, labController.getAllReports);
router.get('/stats', isAuth, labController.getStats);
router.get('/filter', isAuth, labController.filterReports);
router.get('/sample/:sampleCode', isAuth, labController.getBySampleCode);
router.get('/:reportId', isAuth, labController.getReportById);
router.put('/:reportId', isAuth, labController.updateReport);
router.delete('/:reportId', isAuth, labController.deleteReport);

export default router;
