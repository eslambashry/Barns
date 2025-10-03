import { User } from '../database/models/user.schema.js';
import { Role } from '../database/models/role.schema.js';

// Middleware للتحقق من صلاحيات المشرف للقسم المحدد
export const checkDepartmentAccess = (departmentName) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.authUser._id).populate('role');
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'المستخدم غير موجود'
                });
            }

            // Super Admin يمكنه الوصول لكل شيء
            if (user.role.name === 'super_admin') {
                return next();
            }

            // التحقق من صلاحية المشرف للقسم المحدد
            const allowedRoles = {
                'Parasite Control': 'parasite_control_supervisor',
                'Vaccination': 'vaccination_supervisor',
                'Treatment': 'treatment_supervisor',
                'Lab': 'lab_supervisor',
                'Horse Health': 'horse_health_supervisor'
            };

            if (user.role.name !== allowedRoles[departmentName]) {
                return res.status(403).json({
                    success: false,
                    message: 'ليس لديك صلاحية الوصول لهذا القسم'
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'خطأ في التحقق من الصلاحيات',
                error: error.message
            });
        }
    };
};

// Middleware للتحقق من أن المستخدم Super Admin
export const isSuperAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.authUser._id).populate('role');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'المستخدم غير موجود'
            });
        }

        if (user.role.name !== 'super_admin') {
            return res.status(403).json({
                success: false,
                message: 'هذه العملية متاحة فقط للمدير العام'
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'خطأ في التحقق من الصلاحيات',
            error: error.message
        });
    }
};

// Middleware للتحقق من أن المستخدم مشرف (أي نوع)
export const isSupervisor = async (req, res, next) => {
    try {
        const user = await User.findById(req.authUser._id).populate('role');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'المستخدم غير موجود'
            });
        }

        const supervisorRoles = [
            'super_admin',
            'parasite_control_supervisor',
            'vaccination_supervisor',
            'treatment_supervisor',
            'lab_supervisor',
            'horse_health_supervisor'
        ];

        if (!supervisorRoles.includes(user.role.name)) {
            return res.status(403).json({
                success: false,
                message: 'هذه العملية متاحة فقط للمشرفين'
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'خطأ في التحقق من الصلاحيات',
            error: error.message
        });
    }
};
