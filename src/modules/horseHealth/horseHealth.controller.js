import { HorseHealthReport } from "../../database/models/horseHealthReport.schema.js";
import { asyncHandler } from "../../utilities/errorHandeling.js";

// إنشاء تقرير صحة خيول
export const createReport = asyncHandler(async (req, res, next) => {
    const report = await HorseHealthReport.create(req.body);

    res.status(201).json({
        success: true,
        message: 'تم إنشاء التقرير بنجاح',
        data: report
    });
});

// الحصول على جميع التقارير
export const getAllReports = asyncHandler(async (req, res, next) => {
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    const reports = await HorseHealthReport.find()
        .sort({ date: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await HorseHealthReport.countDocuments();

    res.status(200).json({
        success: true,
        count: reports.length,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / limit),
        data: reports
    });
});

// الحصول على تقرير واحد
export const getReportById = asyncHandler(async (req, res, next) => {
    const { reportId } = req.params;

    const report = await HorseHealthReport.findById(reportId);
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
export const updateReport = asyncHandler(async (req, res, next) => {
    const { reportId } = req.params;

    const report = await HorseHealthReport.findByIdAndUpdate(
        reportId,
        req.body,
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
export const deleteReport = asyncHandler(async (req, res, next) => {
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
export const filterReports = asyncHandler(async (req, res, next) => {
    const { startDate, endDate, owner_id, diagnosis } = req.query;

    let query = {};

    if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate);
        if (endDate) query.date.$lte = new Date(endDate);
    }

    if (owner_id) {
        query.owner_id = owner_id;
    }

    if (diagnosis) {
        query.diagnosis = { $regex: diagnosis, $options: 'i' };
    }

    const reports = await HorseHealthReport.find(query).sort({ date: -1 });

    res.status(200).json({
        success: true,
        count: reports.length,
        data: reports
    });
});

// إحصائيات
export const getStats = asyncHandler(async (req, res, next) => {
    const { startDate, endDate } = req.query;

    let query = {};
    if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate);
        if (endDate) query.date.$lte = new Date(endDate);
    }

    const totalReports = await HorseHealthReport.countDocuments(query);

    res.status(200).json({
        success: true,
        data: {
            totalReports
        }
    });
});
