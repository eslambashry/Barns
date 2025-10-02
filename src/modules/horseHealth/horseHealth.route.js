import { Router } from "express";
import * as horseHealthController from "./horseHealth.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = Router();

router.post('/create', isAuth, horseHealthController.createHorseHealthReport);
router.get('/', isAuth, horseHealthController.getAllHorseHealthReports);
router.get('/stats', isAuth, horseHealthController.getHorseHealthStats);
router.get('/comprehensive', isAuth, horseHealthController.getComprehensiveReport);
router.get('/filter', isAuth, horseHealthController.filterHorseHealthReports);
router.get('/:reportId', isAuth, horseHealthController.getHorseHealthReportById);
router.put('/:reportId', isAuth, horseHealthController.updateHorseHealthReport);
router.delete('/:reportId', isAuth, horseHealthController.deleteHorseHealthReport);

export default router;
