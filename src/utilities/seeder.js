import { Role } from "../database/models/role.schema.js";
import { Department } from "../database/models/department.schema.js";
import { User } from "../database/models/user.schema.js";
import bcrypt from "bcrypt";
import { config } from 'dotenv';
import path from 'path';
import { dbConnection } from "../database/dbConnection.js";

config({ path: path.resolve('./config/.env') });

// تهيئة الأدوار (Roles)
const seedRoles = async () => {
    try {
        const roles = [
            {
                name: 'super_admin',
                description: 'مدير عام - صلاحية كاملة على جميع الأقسام'
            },
            {
                name: 'parasite_control_supervisor',
                description: 'مشرف قسم مكافحة الطفيليات'
            },
            {
                name: 'vaccination_supervisor',
                description: 'مشرف قسم التطعيم'
            },
            {
                name: 'treatment_supervisor',
                description: 'مشرف قسم المراقبة والعلاج'
            },
            {
                name: 'lab_supervisor',
                description: 'مشرف قسم المختبرات'
            },
            {
                name: 'horse_health_supervisor',
                description: 'مشرف قسم صحة الخيول'
            },
            {
                name: 'team_member',
                description: 'عضو فريق'
            }
        ];

        for (const role of roles) {
            const existingRole = await Role.findOne({ name: role.name });
            if (!existingRole) {
                await Role.create(role);
                console.log(`✅ تم إنشاء دور: ${role.description}`);
            } else {
                console.log(`⚠️  الدور موجود مسبقاً: ${role.description}`);
            }
        }
    } catch (error) {
        console.error('❌ خطأ في تهيئة الأدوار:', error.message);
    }
};

// تهيئة الأقسام (Departments)
const seedDepartments = async () => {
    try {
        const departments = [
            {
                name: 'Parasite Control',
                code: 'P'
            },
            {
                name: 'Vaccination',
                code: 'V'
            },
            {
                name: 'Treatment & Monitoring',
                code: 'T'
            },
            {
                name: 'Laboratory',
                code: 'L'
            },
            {
                name: 'Horse Health',
                code: 'H'
            }
        ];

        for (const dept of departments) {
            const existingDept = await Department.findOne({ code: dept.code });
            if (!existingDept) {
                await Department.create(dept);
                console.log(`✅ تم إنشاء قسم: ${dept.name} (${dept.code})`);
            } else {
                console.log(`⚠️  القسم موجود مسبقاً: ${dept.name}`);
            }
        }
    } catch (error) {
        console.error('❌ خطأ في تهيئة الأقسام:', error.message);
    }
};

// تهيئة مستخدم Super Admin
const seedSuperAdmin = async () => {
    try {
        const superAdminRole = await Role.findOne({ name: 'super_admin' });
        if (!superAdminRole) {
            console.error('❌ لم يتم العثور على دور Super Admin');
            return;
        }

        const existingAdmin = await User.findOne({ email: 'admin@barns.com' });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('Admin@123', 10);
            await User.create({
                name: 'Super Admin',
                email: 'admin@barns.com',
                password: hashedPassword,
                role: superAdminRole._id
            });
            console.log('✅ تم إنشاء حساب Super Admin');
            console.log('📧 Email: admin@barns.com');
            console.log('🔑 Password: Admin@123');
        } else {
            console.log('⚠️  حساب Super Admin موجود مسبقاً');
        }
    } catch (error) {
        console.error('❌ خطأ في تهيئة Super Admin:', error.message);
    }
};

// تهيئة مشرفي الأقسام (اختياري)
const seedDepartmentSupervisors = async () => {
    try {
        const supervisors = [
            {
                name: 'مشرف مكافحة الطفيليات',
                email: 'parasite@barns.com',
                password: 'Parasite@123',
                roleName: 'parasite_control_supervisor'
            },
            {
                name: 'مشرف التطعيم',
                email: 'vaccination@barns.com',
                password: 'Vaccination@123',
                roleName: 'vaccination_supervisor'
            },
            {
                name: 'مشرف العلاج',
                email: 'treatment@barns.com',
                password: 'Treatment@123',
                roleName: 'treatment_supervisor'
            },
            {
                name: 'مشرف المختبر',
                email: 'lab@barns.com',
                password: 'Lab@123',
                roleName: 'lab_supervisor'
            },
            {
                name: 'مشرف صحة الخيول',
                email: 'horse@barns.com',
                password: 'Horse@123',
                roleName: 'horse_health_supervisor'
            }
        ];

        for (const supervisor of supervisors) {
            const role = await Role.findOne({ name: supervisor.roleName });
            if (!role) {
                console.error(`❌ لم يتم العثور على دور: ${supervisor.roleName}`);
                continue;
            }

            const existingUser = await User.findOne({ email: supervisor.email });
            if (!existingUser) {
                const hashedPassword = await bcrypt.hash(supervisor.password, 10);
                await User.create({
                    name: supervisor.name,
                    email: supervisor.email,
                    password: hashedPassword,
                    role: role._id
                });
                console.log(`✅ تم إنشاء حساب: ${supervisor.name}`);
                console.log(`📧 Email: ${supervisor.email}`);
                console.log(`🔑 Password: ${supervisor.password}`);
            } else {
                console.log(`⚠️  الحساب موجود مسبقاً: ${supervisor.name}`);
            }
        }
    } catch (error) {
        console.error('❌ خطأ في تهيئة مشرفي الأقسام:', error.message);
    }
};

// تشغيل جميع عمليات التهيئة
const runSeeder = async () => {
    console.log('🚀 بدء تهيئة قاعدة البيانات...\n');
    
    await dbConnection;
    
    await seedRoles();
    console.log('\n');
    
    await seedDepartments();
    console.log('\n');
    
    await seedSuperAdmin();
    console.log('\n');
    
    // إلغاء التعليق إذا أردت إنشاء حسابات المشرفين تلقائياً
    // await seedDepartmentSupervisors();
    
    console.log('\n✅ تم الانتهاء من تهيئة قاعدة البيانات');
    process.exit(0);
};

// تشغيل Seeder
runSeeder().catch(error => {
    console.error('❌ خطأ في تشغيل Seeder:', error);
    process.exit(1);
});
