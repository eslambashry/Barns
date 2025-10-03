import { ParasiteControlReport } from "../../database/models/parasiteControlReport.schema.js";
import { asyncHandler } from "../../utilities/errorHandeling.js";

// إنشاء تقرير مكافحة طفيليات
export const createReport = asyncHandler(async (req, res, next) => {
    const reportData = req.body;

    // حساب الإجماليات تلقائياً
    reportData.total_herd = (reportData.total_sheep || 0) + (reportData.total_goats || 0) + 
                            (reportData.total_camel || 0) + (reportData.total_cattle || 0);
    
    reportData.total_young = (reportData.young_sheep || 0) + (reportData.young_goats || 0) + 
                             (reportData.young_camels || 0) + (reportData.young_cattle || 0);
    
    reportData.total_female = (reportData.female_sheep || 0) + (reportData.female_goats || 0) + 
                              (reportData.female_camels || 0) + (reportData.female_cattle || 0);
    
    reportData.total_treated = (reportData.treated_sheep || 0) + (reportData.treated_goats || 0) + 
                               (reportData.treated_camels || 0) + (reportData.treated_cattle || 0);

    const report = await ParasiteControlReport.create(reportData);

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

    const reports = await ParasiteControlReport.find()
        .sort({ date: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await ParasiteControlReport.countDocuments();

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

    const report = await ParasiteControlReport.findById(reportId);
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
    const updateData = req.body;

    // إعادة حساب الإجماليات إذا تم تحديث الأعداد
    if (updateData.total_sheep !== undefined || updateData.total_goats !== undefined ||
        updateData.total_camel !== undefined || updateData.total_cattle !== undefined) {
        
        const report = await ParasiteControlReport.findById(reportId);
        if (report) {
            updateData.total_herd = (updateData.total_sheep ?? report.total_sheep) + 
                                   (updateData.total_goats ?? report.total_goats) + 
                                   (updateData.total_camel ?? report.total_camel) + 
                                   (updateData.total_cattle ?? report.total_cattle);
        }
    }

    const report = await ParasiteControlReport.findByIdAndUpdate(
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
export const deleteReport = asyncHandler(async (req, res, next) => {
    const { reportId } = req.params;

    const report = await ParasiteControlReport.findByIdAndDelete(reportId);
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
    const { startDate, endDate, owner_id, herd_location } = req.query;

    let query = {};

    if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate);
        if (endDate) query.date.$lte = new Date(endDate);
    }

    if (owner_id) {
        query.owner_id = owner_id;
    }

    if (herd_location) {
        query.herd_location = { $regex: herd_location, $options: 'i' };
    }

    const reports = await ParasiteControlReport.find(query).sort({ date: -1 });

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

    const totalReports = await ParasiteControlReport.countDocuments(query);
    
    const stats = await ParasiteControlReport.aggregate([
        { $match: query },
        {
            $group: {
                _id: null,
                totalHerd: { $sum: '$total_herd' },
                totalTreated: { $sum: '$total_treated' }
            }
        }
    ]);

    res.status(200).json({
        success: true,
        data: {
            totalReports,
            totalHerd: stats[0]?.totalHerd || 0,
            totalTreated: stats[0]?.totalTreated || 0
        }
    });
});
