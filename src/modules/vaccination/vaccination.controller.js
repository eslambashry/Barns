import { VaccinationReport } from "../../database/models/vaccinationReport.schema.js";
import { ServiceRequest } from "../../database/models/serviceRequest.schema.js";
import { asyncHandler } from "../../utilities/errorHandeling.js";

// إنشاء تقرير تطعيم جديد
export const createVaccinationReport = asyncHandler(async (req, res, next) => {
    const reportData = req.body;

    const serviceRequest = await ServiceRequest.findById(reportData.service_request);
    if (!serviceRequest) {
        return res.status(404).json({
            success: false,
            message: 'طلب الخدمة غير موجود'
        });
    }

    if (serviceRequest.category !== 'Vaccination') {
        return res.status(400).json({
            success: false,
            message: 'طلب الخدمة ليس من نوع التطعيم'
        });
    }

    // حساب الإجماليات
    if (reportData.herd_information) {
        const herd = reportData.herd_information;
        herd.total_herd = (herd.total_sheep || 0) + (herd.total_goats || 0) + 
                          (herd.total_camel || 0) + (herd.total_cattle || 0);
        herd.total_young = (herd.young_sheep || 0) + (herd.young_goats || 0) + 
                          (herd.young_camels || 0) + (herd.young_cattle || 0);
        herd.total_female = (herd.female_sheep || 0) + (herd.female_goats || 0) + 
                           (herd.female_camels || 0) + (herd.female_cattle || 0);
        herd.total_vaccinated = (herd.vaccinated_sheep || 0) + (herd.vaccinated_goats || 0) + 
                               (herd.vaccinated_camels || 0) + (herd.vaccinated_cattle || 0);
    }

    const report = await VaccinationReport.create(reportData);

    res.status(201).json({
        success: true,
        message: 'تم إنشاء تقرير التطعيم بنجاح',
        data: report
    });
});

// الحصول على جميع تقارير التطعيم
export const getAllVaccinationReports = asyncHandler(async (req, res, next) => {
    const reports = await VaccinationReport.find()
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
export const getVaccinationReportById = asyncHandler(async (req, res, next) => {
    const { reportId } = req.params;

    const report = await VaccinationReport.findById(reportId)
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
export const updateVaccinationReport = asyncHandler(async (req, res, next) => {
    const { reportId } = req.params;
    const updateData = req.body;

    if (updateData.herd_information) {
        const herd = updateData.herd_information;
        herd.total_herd = (herd.total_sheep || 0) + (herd.total_goats || 0) + 
                          (herd.total_camel || 0) + (herd.total_cattle || 0);
        herd.total_young = (herd.young_sheep || 0) + (herd.young_goats || 0) + 
                          (herd.young_camels || 0) + (herd.young_cattle || 0);
        herd.total_female = (herd.female_sheep || 0) + (herd.female_goats || 0) + 
                           (herd.female_camels || 0) + (herd.female_cattle || 0);
        herd.total_vaccinated = (herd.vaccinated_sheep || 0) + (herd.vaccinated_goats || 0) + 
                               (herd.vaccinated_camels || 0) + (herd.vaccinated_cattle || 0);
    }

    const report = await VaccinationReport.findByIdAndUpdate(
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
export const deleteVaccinationReport = asyncHandler(async (req, res, next) => {
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
export const filterVaccinationReports = asyncHandler(async (req, res, next) => {
    const { startDate, endDate, clientId } = req.query;

    let query = {};

    if (startDate || endDate) {
        query.report_date = {};
        if (startDate) query.report_date.$gte = new Date(startDate);
        if (endDate) query.report_date.$lte = new Date(endDate);
    }

    if (clientId) {
        query.client = clientId;
    }

    const reports = await VaccinationReport.find(query)
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

// إحصائيات التطعيم
export const getVaccinationStats = asyncHandler(async (req, res, next) => {
    const { startDate, endDate } = req.query;

    let matchQuery = {};
    if (startDate || endDate) {
        matchQuery.report_date = {};
        if (startDate) matchQuery.report_date.$gte = new Date(startDate);
        if (endDate) matchQuery.report_date.$lte = new Date(endDate);
    }

    const stats = await VaccinationReport.aggregate([
        { $match: matchQuery },
        {
            $group: {
                _id: null,
                totalClients: { $addToSet: '$client' },
                totalReports: { $sum: 1 },
                totalVaccinated: { $sum: '$herd_information.total_vaccinated' }
            }
        },
        {
            $project: {
                _id: 0,
                totalClients: { $size: '$totalClients' },
                totalReports: 1,
                totalVaccinated: 1
            }
        }
    ]);

    res.status(200).json({
        success: true,
        data: stats[0] || { totalClients: 0, totalReports: 0, totalVaccinated: 0 }
    });
});
