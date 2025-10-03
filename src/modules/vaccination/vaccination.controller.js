import { VaccinationReport } from "../../database/models/vaccinationReport.schema.js";
import { asyncHandler } from "../../utilities/errorHandeling.js";

// إنشاء تقرير تطعيم
export const createReport = asyncHandler(async (req, res, next) => {
    const reportData = req.body;

    // حساب الإجماليات
    reportData.herd_number = (reportData.total_sheep || 0) + (reportData.total_goats || 0) + 
                            (reportData.total_camel || 0) + (reportData.total_cattle || 0);
    
    reportData.herd_females = (reportData.female_sheep || 0) + (reportData.female_goats || 0) + 
                             (reportData.female_camel || 0) + (reportData.female_cattle || 0);
    
    reportData.total_vaccinated = (reportData.vaccinated_sheep || 0) + (reportData.vaccinated_goats || 0) + 
                                 (reportData.vaccinated_camel || 0) + (reportData.vaccinated_cattle || 0);

    const report = await VaccinationReport.create(reportData);

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

    const reports = await VaccinationReport.find()
        .sort({ date: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await VaccinationReport.countDocuments();

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

    const report = await VaccinationReport.findById(reportId);
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

    const report = await VaccinationReport.findByIdAndUpdate(
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

    const report = await VaccinationReport.findByIdAndDelete(reportId);
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
    const { startDate, endDate, owner_id, farm_location } = req.query;

    let query = {};

    if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate);
        if (endDate) query.date.$lte = new Date(endDate);
    }

    if (owner_id) {
        query.owner_id = owner_id;
    }

    if (farm_location) {
        query.farm_location = { $regex: farm_location, $options: 'i' };
    }

    const reports = await VaccinationReport.find(query).sort({ date: -1 });

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

    const totalReports = await VaccinationReport.countDocuments(query);
    
    const stats = await VaccinationReport.aggregate([
        { $match: query },
        {
            $group: {
                _id: null,
                totalVaccinated: { $sum: '$total_vaccinated' }
            }
        }
    ]);

    res.status(200).json({
        success: true,
        data: {
            totalReports,
            totalVaccinated: stats[0]?.totalVaccinated || 0
        }
    });
});
