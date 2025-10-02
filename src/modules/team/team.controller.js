import { Team } from "../../database/models/team.schema.js";
import { Department } from "../../database/models/department.schema.js";
import { User } from "../../database/models/user.schema.js";
import { Client } from "../../database/models/client.schema.js";
import { asyncHandler } from "../../utilities/errorHandeling.js";

// إنشاء فريق جديد
export const createTeam = asyncHandler(async (req, res, next) => {
    const { team_name, department, assigned_client, assigned_village, team_members, supervisor, vehicle_no, notes } = req.body;

    // التحقق من وجود القسم
    const deptExists = await Department.findById(department);
    if (!deptExists) {
        return res.status(404).json({
            success: false,
            message: 'القسم غير موجود'
        });
    }

    // التحقق من وجود المشرف
    const supervisorExists = await User.findById(supervisor);
    if (!supervisorExists) {
        return res.status(404).json({
            success: false,
            message: 'المشرف غير موجود'
        });
    }

    // التحقق من وجود العميل إذا تم تحديده
    if (assigned_client) {
        const clientExists = await Client.findById(assigned_client);
        if (!clientExists) {
            return res.status(404).json({
                success: false,
                message: 'العميل غير موجود'
            });
        }

        // التحقق من أن القرية موجودة لدى العميل
        if (assigned_village) {
            const villageExists = clientExists.villages.some(v => v.name === assigned_village);
            if (!villageExists) {
                return res.status(400).json({
                    success: false,
                    message: 'القرية المحددة غير موجودة لدى هذا العميل'
                });
            }
        }
    }

    const team = await Team.create({
        team_name,
        department,
        assigned_client,
        assigned_village,
        team_members,
        supervisor,
        vehicle_no,
        notes
    });

    const populatedTeam = await Team.findById(team._id)
        .populate('department')
        .populate('supervisor', 'name email')
        .populate('assigned_client', 'name national_id phone')
        .populate('team_members.user', 'name email');

    res.status(201).json({
        success: true,
        message: 'تم إنشاء الفريق بنجاح',
        data: populatedTeam
    });
});

// الحصول على جميع الفرق
export const getAllTeams = asyncHandler(async (req, res, next) => {
    const teams = await Team.find()
        .populate('department')
        .populate('supervisor', 'name email')
        .populate('assigned_client', 'name national_id phone')
        .populate('team_members.user', 'name email')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: teams.length,
        data: teams
    });
});

// الحصول على فرق قسم معين
export const getTeamsByDepartment = asyncHandler(async (req, res, next) => {
    const { departmentId } = req.params;

    const teams = await Team.find({ department: departmentId })
        .populate('department')
        .populate('supervisor', 'name email')
        .populate('assigned_client', 'name national_id phone')
        .populate('team_members.user', 'name email')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: teams.length,
        data: teams
    });
});

// الحصول على فرق عميل معين
export const getTeamsByClient = asyncHandler(async (req, res, next) => {
    const { clientId } = req.params;

    const teams = await Team.find({ assigned_client: clientId })
        .populate('department')
        .populate('supervisor', 'name email')
        .populate('assigned_client', 'name national_id phone')
        .populate('team_members.user', 'name email')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: teams.length,
        data: teams
    });
});

// الحصول على فريق واحد
export const getTeamById = asyncHandler(async (req, res, next) => {
    const { teamId } = req.params;

    const team = await Team.findById(teamId)
        .populate('department')
        .populate('supervisor', 'name email')
        .populate('assigned_client', 'name national_id phone villages')
        .populate('team_members.user', 'name email');

    if (!team) {
        return res.status(404).json({
            success: false,
            message: 'الفريق غير موجود'
        });
    }

    res.status(200).json({
        success: true,
        data: team
    });
});

// تحديث فريق
export const updateTeam = asyncHandler(async (req, res, next) => {
    const { teamId } = req.params;
    const updateData = req.body;

    // التحقق من العميل والقرية إذا تم تحديثهما
    if (updateData.assigned_client) {
        const clientExists = await Client.findById(updateData.assigned_client);
        if (!clientExists) {
            return res.status(404).json({
                success: false,
                message: 'العميل غير موجود'
            });
        }

        if (updateData.assigned_village) {
            const villageExists = clientExists.villages.some(v => v.name === updateData.assigned_village);
            if (!villageExists) {
                return res.status(400).json({
                    success: false,
                    message: 'القرية المحددة غير موجودة لدى هذا العميل'
                });
            }
        }
    }

    const team = await Team.findByIdAndUpdate(
        teamId,
        updateData,
        { new: true, runValidators: true }
    )
        .populate('department')
        .populate('supervisor', 'name email')
        .populate('assigned_client', 'name national_id phone')
        .populate('team_members.user', 'name email');

    if (!team) {
        return res.status(404).json({
            success: false,
            message: 'الفريق غير موجود'
        });
    }

    res.status(200).json({
        success: true,
        message: 'تم تحديث الفريق بنجاح',
        data: team
    });
});

// إضافة عضو للفريق
export const addTeamMember = asyncHandler(async (req, res, next) => {
    const { teamId } = req.params;
    const { user, role } = req.body;

    // التحقق من وجود المستخدم
    const userExists = await User.findById(user);
    if (!userExists) {
        return res.status(404).json({
            success: false,
            message: 'المستخدم غير موجود'
        });
    }

    const team = await Team.findById(teamId);
    if (!team) {
        return res.status(404).json({
            success: false,
            message: 'الفريق غير موجود'
        });
    }

    // التحقق من أن العضو ليس موجوداً مسبقاً
    const memberExists = team.team_members.some(m => m.user.toString() === user);
    if (memberExists) {
        return res.status(400).json({
            success: false,
            message: 'العضو موجود مسبقاً في الفريق'
        });
    }

    team.team_members.push({ user, role });
    await team.save();

    const updatedTeam = await Team.findById(teamId)
        .populate('department')
        .populate('supervisor', 'name email')
        .populate('assigned_client', 'name national_id phone')
        .populate('team_members.user', 'name email');

    res.status(200).json({
        success: true,
        message: 'تم إضافة العضو بنجاح',
        data: updatedTeam
    });
});

// إزالة عضو من الفريق
export const removeTeamMember = asyncHandler(async (req, res, next) => {
    const { teamId, userId } = req.params;

    const team = await Team.findById(teamId);
    if (!team) {
        return res.status(404).json({
            success: false,
            message: 'الفريق غير موجود'
        });
    }

    team.team_members = team.team_members.filter(m => m.user.toString() !== userId);
    await team.save();

    const updatedTeam = await Team.findById(teamId)
        .populate('department')
        .populate('supervisor', 'name email')
        .populate('assigned_client', 'name national_id phone')
        .populate('team_members.user', 'name email');

    res.status(200).json({
        success: true,
        message: 'تم إزالة العضو بنجاح',
        data: updatedTeam
    });
});

// تغيير حالة الفريق
export const updateTeamStatus = asyncHandler(async (req, res, next) => {
    const { teamId } = req.params;
    const { status } = req.body;

    const team = await Team.findByIdAndUpdate(
        teamId,
        { status },
        { new: true, runValidators: true }
    )
        .populate('department')
        .populate('supervisor', 'name email')
        .populate('assigned_client', 'name national_id phone')
        .populate('team_members.user', 'name email');

    if (!team) {
        return res.status(404).json({
            success: false,
            message: 'الفريق غير موجود'
        });
    }

    res.status(200).json({
        success: true,
        message: 'تم تحديث حالة الفريق بنجاح',
        data: team
    });
});

// حذف فريق
export const deleteTeam = asyncHandler(async (req, res, next) => {
    const { teamId } = req.params;

    const team = await Team.findByIdAndDelete(teamId);
    if (!team) {
        return res.status(404).json({
            success: false,
            message: 'الفريق غير موجود'
        });
    }

    res.status(200).json({
        success: true,
        message: 'تم حذف الفريق بنجاح'
    });
});

// فلترة الفرق
export const filterTeams = asyncHandler(async (req, res, next) => {
    const { department, status, assigned_client, assigned_village } = req.query;

    let query = {};

    if (department) {
        query.department = department;
    }

    if (status) {
        query.status = status;
    }

    if (assigned_client) {
        query.assigned_client = assigned_client;
    }

    if (assigned_village) {
        query.assigned_village = assigned_village;
    }

    const teams = await Team.find(query)
        .populate('department')
        .populate('supervisor', 'name email')
        .populate('assigned_client', 'name national_id phone')
        .populate('team_members.user', 'name email')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: teams.length,
        data: teams
    });
});
