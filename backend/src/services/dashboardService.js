// backend/src/services/dashboardService.js

const User = require("../models/User");
const Order = require("../models/Order");
const Video = require("../models/Video");
const Product = require("../models/Product");
const Service = require("../models/Service");
const Category = require("../models/Category");
const { AppError, catchAsyncService } = require("../utils/errorHandler");

// Dashboard Stats
const getDashboardStats = catchAsyncService(async () => {
    // Calculate current and previous week ranges
    const now = new Date();
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - now.getDay()); // Sunday
    startOfThisWeek.setHours(0, 0, 0, 0);
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
    const endOfLastWeek = new Date(startOfThisWeek);

    // Current totals
    const [
        totalVideos,
        totalProducts,
        totalServices,
        totalCategories
    ] = await Promise.all([
        Video.countDocuments(),
        Product.countDocuments(),
        Service.countDocuments(),
        Category.countDocuments()
    ]);

    // This week counts
    const [
        videosThisWeek,
        productsThisWeek,
        servicesThisWeek,
        categoriesThisWeek
    ] = await Promise.all([
        Video.countDocuments({ createdAt: { $gte: startOfThisWeek } }),
        Product.countDocuments({ createdAt: { $gte: startOfThisWeek } }),
        Service.countDocuments({ createdAt: { $gte: startOfThisWeek } }),
        Category.countDocuments({ createdAt: { $gte: startOfThisWeek } })
    ]);

    // Last week counts
    const [
        videosLastWeek,
        productsLastWeek,
        servicesLastWeek,
        categoriesLastWeek
    ] = await Promise.all([
        Video.countDocuments({ createdAt: { $gte: startOfLastWeek, $lt: endOfLastWeek } }),
        Product.countDocuments({ createdAt: { $gte: startOfLastWeek, $lt: endOfLastWeek } }),
        Service.countDocuments({ createdAt: { $gte: startOfLastWeek, $lt: endOfLastWeek } }),
        Category.countDocuments({ createdAt: { $gte: startOfLastWeek, $lt: endOfLastWeek } })
    ]);

    // Calculate percentage change (handle division by zero)
    function getChange(thisWeek, lastWeek) {
        if (lastWeek === 0 && thisWeek > 0) return 1; // 100% increase from 0
        if (lastWeek === 0 && thisWeek === 0) return 0;
        return (thisWeek - lastWeek) / lastWeek;
    }

    return {
        totalVideos,
        totalVideosChange: getChange(videosThisWeek, videosLastWeek),
        totalProducts,
        totalProductsChange: getChange(productsThisWeek, productsLastWeek),
        totalServices,
        totalServicesChange: getChange(servicesThisWeek, servicesLastWeek),
        totalCategories,
        totalCategoriesChange: getChange(categoriesThisWeek, categoriesLastWeek)
    };
});

// Recent Activity (last 5 actions from videos, products, services, categories)
const getRecentActivity = catchAsyncService(async () => {
    const [videos, products, services, categories] = await Promise.all([
        Video.find().sort({ createdAt: -1 }).limit(5),
        Product.find().sort({ updatedAt: -1 }).limit(5),
        Service.find().sort({ updatedAt: -1 }).limit(5),
        Category.find().sort({ createdAt: -1 }).limit(5)
    ]);
    if (!videos && !products && !services && !categories) {
        throw new AppError("Failed to fetch recent activity", 500);
    }
    const activities = [
        ...videos.map(v => ({ type: 'video', title: v.title, time: v.createdAt, action: 'New video uploaded' })),
        ...products.map(p => ({ type: 'product', title: p.name, time: p.updatedAt, action: 'Product updated' })),
        ...services.map(s => ({ type: 'service', title: s.name, time: s.updatedAt, action: 'Service updated' })),
        ...categories.map(c => ({ type: 'category', title: c.name, time: c.createdAt, action: 'New category added' })),
    ];
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    return activities.slice(0, 8);
});

// Performance Overview (monthly stats for chart)
const getPerformanceOverview = catchAsyncService(async () => {
    const now = new Date();
    const months = [];
    for (let i = 3; i >= 0; i--) {
        const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
        const videoCount = await Video.countDocuments({ createdAt: { $gte: start, $lt: end } });
        const productCount = await Product.countDocuments({ createdAt: { $gte: start, $lt: end } });
        if (videoCount === undefined || productCount === undefined) {
            throw new AppError("Failed to fetch performance overview", 500);
        }
        months.push({
            month: start.toLocaleString('default', { month: 'long' }),
            videos: videoCount,
            products: productCount
        });
    }
    return months;
});

// Top Products (by sales)
const getTopProducts = catchAsyncService(async () => {
    const topProducts = await Order.aggregate([
        { $unwind: "$items" },
        { $group: { _id: "$items.product", totalSold: { $sum: "$items.quantity" } } },
        { $sort: { totalSold: -1 } },
        { $limit: 4 },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product"
            }
        },
        { $unwind: "$product" },
        {
            $project: {
                name: "$product.name",
                value: "$totalSold"
            }
        }
    ]);
    if (!topProducts) {
        throw new AppError("Failed to fetch top products", 500);
    }
    return topProducts;
});

// User Engagement (example metrics)
const getUserEngagement = catchAsyncService(async () => {
    const totalUsers = await User.countDocuments({ role: 'user' });
    if (totalUsers === undefined) {
        throw new AppError("Failed to fetch user engagement data", 500);
    }
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const activeUsers = await User.countDocuments({ lastLogin: { $gte: sevenDaysAgo }, role: 'user' });
    if (activeUsers === undefined) {
        throw new AppError("Failed to fetch active users", 500);
    }
    const usersWithOrders = await Order.distinct("user");
    if (usersWithOrders === undefined) {
        throw new AppError("Failed to fetch users with orders", 500);
    }
    const conversionRate = totalUsers ? (usersWithOrders.length / totalUsers) * 100 : 0;
    return {
        activeUsers,
        conversionRate: `${conversionRate.toFixed(1)}%`,
        sessionDuration: "4m 23s", // Placeholder
        bounceRate: "32.4%" // Placeholder
    };
});

module.exports = {
    getDashboardStats,
    getRecentActivity,
    getPerformanceOverview,
    getTopProducts,
    getUserEngagement
};