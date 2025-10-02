import { HorseHealthReport } from "../../database/models/horseHealthReport.schema.js";
import { ServiceRequest } from "../../database/models/serviceRequest.schema.js";
import { asyncHandler } from "../../utilities/errorHandeling.js";

// إنشاء تقرير صحة خيول جديد
export const createHorseHealthReport = asyncHandler(async (req, res, next) => {
    const reportData = req.body;

    const serviceRequest = await ServiceRequest.findById(reportData.service_request);
    if (!serviceRequest) {
        return res.status(404).json({
            success: false,
            message: 'طلب الخدمة غير موجود'
        });
    }

    if (serviceRequest.category !== 'Horse Health Check') {
        return res.status(400).json({
            success: false,
            message: 'طلب الخدمة ليس من نوع صحة الخيول'
        });
    }

    const report = await HorseHealthReport.create(reportData);

    res.status(201).json({
        success: true,
        message: 'تم إنشاء تقرير صحة الخيول بنجاح',
        data: report
    });
});

// الحصول على جميع تقارير صحة الخيول
export const getAllHorseHealthReports = asyncHandler(async (req, res, next) => {
    const reports = await HorseHealthReport.find()
        .populate('service_request')
        .populate('client')
        .populate({
            path: 'team',
            populate: { path: 'supervisor department' }
        })
        .sort({ report_date: -1 });

    res.status(200).json({
        success: true,
        count: reports.length,
        data: reports
    });
});

// الحصول على تقرير واحد
export const getHorseHealthReportById = asyncHandler(async (req, res, next) => {
    const { reportId } = req.params;

    const report = await HorseHealthReport.findById(reportId)
        .populate('service_request')
        .populate('client')
        .populate({
            path: 'team',
            populate: { path: 'supervisor department' }
        });

    if (!report) {
        return res.status(404).json({
            success: false,
            message: 'التقرير غير موجود'
        });
    }

    res.status(200).json({
        success: true,
        data: report
    });
});

// تحديث تقرير
export const updateHorseHealthReport = asyncHandler(async (req, res, next) => {
    const { reportId } = req.params;
    const updateData = req.body;

    const report = await HorseHealthReport.findByIdAndUpdate(
        reportId,
        updateData,
        { new: true, runValidators: true }
    );

    if (!report) {
        return res.status(404).json({
            success: false,
            message: 'التقرير غير موجود'
        });
    }

    res.status(200).json({
        success: true,
        message: 'تم تحديث التقرير بنجاح',
        data: report
    });
});

// حذف تقرير
export const deleteHorseHealthReport = asyncHandler(async (req, res, next) => {
    const { reportId } = req.params;

    const report = await HorseHealthReport.findByIdAndDelete(reportId);
    if (!report) {
        return res.status(404).json({
            success: false,
            message: 'التقرير غير موجود'
        });
    }

    res.status(200).json({
        success: true,
        message: 'تم حذف التقرير بنجاح'
    });
});

// فلترة التقارير
export const filterHorseHealthReports = asyncHandler(async (req, res, next) => {
    const { startDate, endDate, clientId, healthCheckType, healthStatus } = req.query;

    let query = {};

    if (startDate || endDate) {
        query.report_date = {};
        if (startDate) query.report_date.$gte = new Date(startDate);
        if (endDate) query.report_date.$lte = new Date(endDate);
    }

    if (clientId) {
        query.client = clientId;
    }

    if (healthCheckType) {
        query.health_check_type = healthCheckType;
    }

    if (healthStatus) {
        query.health_status = healthStatus;
    }

    const reports = await HorseHealthReport.find(query)
        .populate('service_request')
        .populate('client')
        .populate({
            path: 'team',
            populate: { path: 'supervisor department' }
        })
        .sort({ report_date: -1 });

    res.status(200).json({
        success: true,
        count: reports.length,
        data: reports
    });
});

// إحصائيات صحة الخيول
export const getHorseHealthStats = asyncHandler(async (req, res, next) => {
    const { startDate, endDate } = req.query;

    let matchQuery = {};
    if (startDate || endDate) {
        matchQuery.report_date = {};
        if (startDate) matchQuery.report_date.$gte = new Date(startDate);
        if (endDate) matchQuery.report_date.$lte = new Date(endDate);
    }

    const stats = await HorseHealthReport.aggregate([
        { $match: matchQuery },
        {
            $group: {
                _id: null,
                totalClients: { $addToSet: '$client' },
                totalReports: { $sum: 1 },
                totalHorses: { $sum: '$total_horses' }
            }
        },
        {
            $project: {
                _id: 0,
                totalClients: { $size: '$totalClients' },
                totalReports: 1,
                totalHorses: 1
            }
        }
    ]);

    res.status(200).json({
        success: true,
        data: stats[0] || { totalClients: 0, totalReports: 0, totalHorses: 0 }
    });
});

// تقرير شامل لجميع الخدمات (إجمالي)
export const getComprehensiveReport = asyncHandler(async (req, res, next) => {
    const { startDate, endDate } = req.query;

    let matchQuery = {};
    if (startDate || endDate) {
        matchQuery.report_date = {};
        if (startDate) matchQuery.report_date.$gte = new Date(startDate);
        if (endDate) matchQuery.report_date.$lte = new Date(endDate);
    }

    const reports = await HorseHealthReport.find(matchQuery)
        .populate('service_request')
        .populate('client')
        .populate({
            path: 'team',
            populate: { path: 'supervisor department' }
        })
        .sort({ report_date: -1 });

    // تجميع البيانات من جميع أنواع الخدمات
    const summary = {
        totalReports: reports.length,
        totalHorses: reports.reduce((sum, r) => sum + (r.total_horses || 0), 0),
        byHealthCheckType: {},
        byHealthStatus: {}
    };

    reports.forEach(report => {
        // حسب نوع الفحص
        if (report.health_check_type) {
            summary.byHealthCheckType[report.health_check_type] = 
                (summary.byHealthCheckType[report.health_check_type] || 0) + 1;
        }
        // حسب الحالة الصحية
        if (report.health_status) {
            summary.byHealthStatus[report.health_status] = 
                (summary.byHealthStatus[report.health_status] || 0) + 1;
        }
    });

    res.status(200).json({
        success: true,
        data: {
            reports,
            summary
        }
    });
});
