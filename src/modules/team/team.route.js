import { Router } from "express";
import * as teamController from "./team.controller.js";
import { isAuth } from "../../middleware/isAuth.js";
import { isSupervisor } from "../../middleware/authorization.js";

const router = Router();

// إنشاء فريق جديد (مشرفين فقط)
router.post('/create', isAuth, isSupervisor, teamController.createTeam);

// الحصول على جميع الفرق
router.get('/', isAuth, teamController.getAllTeams);

// فلترة الفرق
router.get('/filter', isAuth, teamController.filterTeams);

// الحصول على فرق قسم معين
router.get('/department/:departmentId', isAuth, teamController.getTeamsByDepartment);

// الحصول على فرق عميل معين
router.get('/client/:clientId', isAuth, teamController.getTeamsByClient);

// الحصول على فريق واحد
router.get('/:teamId', isAuth, teamController.getTeamById);

// تحديث فريق (مشرفين فقط)
router.put('/:teamId', isAuth, isSupervisor, teamController.updateTeam);

// تغيير حالة الفريق (مشرفين فقط)
router.patch('/:teamId/status', isAuth, isSupervisor, teamController.updateTeamStatus);

// إضافة عضو للفريق (مشرفين فقط)
router.post('/:teamId/add-member', isAuth, isSupervisor, teamController.addTeamMember);

// إزالة عضو من الفريق (مشرفين فقط)
router.delete('/:teamId/remove-member/:userId', isAuth, isSupervisor, teamController.removeTeamMember);

// حذف فريق (مشرفين فقط)
router.delete('/:teamId', isAuth, isSupervisor, teamController.deleteTeam);

export default router;
