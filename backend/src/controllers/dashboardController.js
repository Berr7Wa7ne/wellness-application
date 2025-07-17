// backend/src/controllers/dashboardController.js

const dashboardService = require("../services/dashboardService");
const { catchAsync } = require("../utils/errorHandler");

const getDashboardStats = catchAsync(async (req, res) => {
    const stats = await dashboardService.getDashboardStats();
    res.json({ success: true, data: stats });
});

const getRecentActivity = catchAsync(async (req, res) => {
    const activity = await dashboardService.getRecentActivity();
    res.json({ success: true, data: activity });
});

const getPerformanceOverview = catchAsync(async (req, res) => {
    const overview = await dashboardService.getPerformanceOverview();
    res.json({ success: true, data: overview });
});

const getTopProducts = catchAsync(async (req, res) => {
    const products = await dashboardService.getTopProducts();
    res.json({ success: true, data: products });
});

const getUserEngagement = catchAsync(async (req, res) => {
    const engagement = await dashboardService.getUserEngagement();
    res.json({ success: true, data: engagement });
});

const dashboardController = {
    getDashboardStats,
    getRecentActivity,
    getPerformanceOverview,
    getTopProducts,
    getUserEngagement
};

module.exports = dashboardController;