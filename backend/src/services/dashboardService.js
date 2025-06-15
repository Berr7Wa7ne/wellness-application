const User = require("../models/user");
const Order = require("../models/Order");
const { AppError, catchAsyncService } = require("../utils/errorHandler");

// Get dashboard statistics
const getDashboardStats = catchAsyncService(async () => {
    // Get total users
    const totalUsers = await User.countDocuments();
    
    // Get total orders and revenue
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    
    // Get active subscriptions (users with active orders in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeSubscriptions = await Order.countDocuments({
        createdAt: { $gte: thirtyDaysAgo },
        status: 'completed'
    });

    return {
        totalUsers,
        totalOrders,
        totalRevenue,
        activeSubscriptions
    };
});

// Get recent orders
const getRecentOrders = catchAsyncService(async (limit = 10) => {
    const orders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('user', 'name email')
        .populate('items.product', 'name price');

    return orders;
});

// Get revenue analytics
const getRevenueAnalytics = catchAsyncService(async (period = 'monthly') => {
    const now = new Date();
    let startDate;

    switch (period) {
        case 'daily':
            startDate = new Date(now.setDate(now.getDate() - 7)); // Last 7 days
            break;
        case 'weekly':
            startDate = new Date(now.setDate(now.getDate() - 28)); // Last 4 weeks
            break;
        case 'monthly':
            startDate = new Date(now.setMonth(now.getMonth() - 6)); // Last 6 months
            break;
        default:
            throw new AppError('Invalid period specified', 400);
    }

    const orders = await Order.find({
        createdAt: { $gte: startDate },
        status: 'completed'
    }).sort({ createdAt: 1 });

    // Group orders by period
    const revenueData = orders.reduce((acc, order) => {
        let key;
        const date = new Date(order.createdAt);

        switch (period) {
            case 'daily':
                key = date.toISOString().split('T')[0];
                break;
            case 'weekly':
                const weekNumber = Math.ceil((date.getDate() + date.getDay()) / 7);
                key = `Week ${weekNumber}`;
                break;
            case 'monthly':
                key = date.toLocaleString('default', { month: 'long', year: 'numeric' });
                break;
        }

        if (!acc[key]) {
            acc[key] = 0;
        }
        acc[key] += order.totalAmount || 0;
        return acc;
    }, {});

    return {
        period,
        data: Object.entries(revenueData).map(([label, amount]) => ({
            label,
            amount
        }))
    };
});

module.exports = {
    getDashboardStats,
    getRecentOrders,
    getRevenueAnalytics
}; 