import { TreatmentReport } from "../../database/models/treatmentReport.schema.js";
import { ServiceRequest } from "../../database/models/serviceRequest.schema.js";
import { asyncHandler } from "../../utilities/errorHandeling.js";

// إنشاء تقرير علاج جديد
export const createTreatmentReport = asyncHandler(async (req, res, next) => {
    const reportData = req.body;

    const serviceRequest = await ServiceRequest.findById(reportData.service_request);
    if (!serviceRequest) {
        return res.status(404).json({
            success: false,
            message: 'طلب الخدمة غير موجود'
        });
    }

    if (serviceRequest.category !== 'm clinic treatment') {
        return res.status(400).json({
            success: false,
            message: 'طلب الخدمة ليس من نوع العلاج'
        });
    }

    // حساب إجمالي الحيوانات
    if (reportData.animal_count) {
        const count = reportData.animal_count;
        count.total = (count.sheep || 0) + (count.goats || 0) + 
                     (count.camel || 0) + (count.horse || 0) + (count.cattle || 0);
    }

    const report = await TreatmentReport.create(reportData);

    res.status(201).json({
        success: true,
        message: 'تم إنشاء تقرير العلاج بنجاح',
        data: report
    });
});

// الحصول على جميع تقارير العلاج
export const getAllTreatmentReports = asyncHandler(async (req, res, next) => {
    const reports = await TreatmentReport.find()
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
export const getTreatmentReportById = asyncHandler(async (req, res, next) => {
    const { reportId } = req.params;

    const report = await TreatmentReport.findById(reportId)
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
export const updateTreatmentReport = asyncHandler(async (req, res, next) => {
    const { reportId } = req.params;
    const updateData = req.body;

    if (updateData.animal_count) {
        const count = updateData.animal_count;
        count.total = (count.sheep || 0) + (count.goats || 0) + 
                     (count.camel || 0) + (count.horse || 0) + (count.cattle || 0);
    }

    const report = await TreatmentReport.findByIdAndUpdate(
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
export const deleteTreatmentReport = asyncHandler(async (req, res, next) => {
    const { reportId } = req.params;

    const report = await TreatmentReport.findByIdAndDelete(reportId);
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
export const filterTreatmentReports = asyncHandler(async (req, res, next) => {
    const { startDate, endDate, clientId, diagnosis } = req.query;

    let query = {};

    if (startDate || endDate) {
        query.report_date = {};
        if (startDate) query.report_date.$gte = new Date(startDate);
        if (endDate) query.report_date.$lte = new Date(endDate);
    }

    if (clientId) {
        query.client = clientId;
    }

    if (diagnosis) {
        query.diagnosis = { $regex: diagnosis, $options: 'i' };
    }

    const reports = await TreatmentReport.find(query)
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

// إحصائيات العلاج
export const getTreatmentStats = asyncHandler(async (req, res, next) => {
    const { startDate, endDate } = req.query;

    let matchQuery = {};
    if (startDate || endDate) {
        matchQuery.report_date = {};
        if (startDate) matchQuery.report_date.$gte = new Date(startDate);
        if (endDate) matchQuery.report_date.$lte = new Date(endDate);
    }

    const stats = await TreatmentReport.aggregate([
        { $match: matchQuery },
        {
            $group: {
                _id: null,
                totalClients: { $addToSet: '$client' },
                totalReports: { $sum: 1 },
                totalTreated: { $sum: '$treated_count' }
            }
        },
        {
            $project: {
                _id: 0,
                totalClients: { $size: '$totalClients' },
                totalReports: 1,
                totalTreated: 1
            }
        }
    ]);

    res.status(200).json({
        success: true,
        data: stats[0] || { totalClients: 0, totalReports: 0, totalTreated: 0 }
    });
});
