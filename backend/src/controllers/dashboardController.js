const dashboardService = require("../services/dashboardService");
const { catchAsync } = require("../utils/errorHandler");

// Get dashboard statistics
const getDashboardStats = catchAsync(async (req, res) => {
    const stats = await dashboardService.getDashboardStats();
    res.json({
        success: true,
        data: stats
    });
});

// Get recent orders
const getRecentOrders = catchAsync(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const orders = await dashboardService.getRecentOrders(limit);
    res.json({
        success: true,
        data: orders
    });
});

// Get revenue analytics
const getRevenueAnalytics = catchAsync(async (req, res) => {
    const period = req.query.period || 'monthly';
    const analytics = await dashboardService.getRevenueAnalytics(period);
    res.json({
        success: true,
        data: analytics
    });
});

const dashboardController = {
    getDashboardStats,
    getRecentOrders,
    getRevenueAnalytics
};

module.exports = dashboardController; 