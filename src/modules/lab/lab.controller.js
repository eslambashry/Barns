import { LabReport } from "../../database/models/labReport.schema.js";
import { ServiceRequest } from "../../database/models/serviceRequest.schema.js";
import { asyncHandler } from "../../utilities/errorHandeling.js";

// إنشاء تقرير مختبر جديد
export const createLabReport = asyncHandler(async (req, res, next) => {
    const reportData = req.body;

    const serviceRequest = await ServiceRequest.findById(reportData.service_request);
    if (!serviceRequest) {
        return res.status(404).json({
            success: false,
            message: 'طلب الخدمة غير موجود'
        });
    }

    if (serviceRequest.category !== 'Lab Test') {
        return res.status(400).json({
            success: false,
            message: 'طلب الخدمة ليس من نوع الفحص المخبري'
        });
    }

    const report = await LabReport.create(reportData);

    res.status(201).json({
        success: true,
        message: 'تم إنشاء تقرير المختبر بنجاح',
        data: report
    });
});

// الحصول على جميع تقارير المختبر
export const getAllLabReports = asyncHandler(async (req, res, next) => {
    const reports = await LabReport.find()
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
export const getLabReportById = asyncHandler(async (req, res, next) => {
    const { reportId } = req.params;

    const report = await LabReport.findById(reportId)
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

// البحث بكود العينة
export const getLabReportBySampleCode = asyncHandler(async (req, res, next) => {
    const { sampleCode } = req.params;

    const report = await LabReport.findOne({ sample_code: sampleCode })
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
export const updateLabReport = asyncHandler(async (req, res, next) => {
    const { reportId } = req.params;
    const updateData = req.body;

    const report = await LabReport.findByIdAndUpdate(
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
export const deleteLabReport = asyncHandler(async (req, res, next) => {
    const { reportId } = req.params;

    const report = await LabReport.findByIdAndDelete(reportId);
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
export const filterLabReports = asyncHandler(async (req, res, next) => {
    const { startDate, endDate, clientId, animalType, sampleType, sampleValid } = req.query;

    let query = {};

    if (startDate || endDate) {
        query.report_date = {};
        if (startDate) query.report_date.$gte = new Date(startDate);
        if (endDate) query.report_date.$lte = new Date(endDate);
    }

    if (clientId) {
        query.client = clientId;
    }

    if (animalType) {
        query.animal_type = animalType;
    }

    if (sampleType) {
        query.sample_type = sampleType;
    }

    if (sampleValid !== undefined) {
        query.sample_valid_for_testing = sampleValid === 'true';
    }

    const reports = await LabReport.find(query)
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

// إحصائيات المختبر
export const getLabStats = asyncHandler(async (req, res, next) => {
    const { startDate, endDate } = req.query;

    let matchQuery = {};
    if (startDate || endDate) {
        matchQuery.report_date = {};
        if (startDate) matchQuery.report_date.$gte = new Date(startDate);
        if (endDate) matchQuery.report_date.$lte = new Date(endDate);
    }

    const stats = await LabReport.aggregate([
        { $match: matchQuery },
        {
            $group: {
                _id: null,
                totalClients: { $addToSet: '$client' },
                totalReports: { $sum: 1 },
                validSamples: {
                    $sum: { $cond: ['$sample_valid_for_testing', 1, 0] }
                },
                invalidSamples: {
                    $sum: { $cond: ['$sample_valid_for_testing', 0, 1] }
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalClients: { $size: '$totalClients' },
                totalReports: 1,
                validSamples: 1,
                invalidSamples: 1
            }
        }
    ]);

    res.status(200).json({
        success: true,
        data: stats[0] || { totalClients: 0, totalReports: 0, validSamples: 0, invalidSamples: 0 }
    });
});
