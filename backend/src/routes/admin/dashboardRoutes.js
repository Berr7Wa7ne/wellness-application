const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/dashboardController");
const { verifyAdmin } = require("../../middleware/authMiddleware");

// Admin Dashboard Routes (Protected)
router.get("/stats", verifyAdmin, dashboardController.getDashboardStats);
router.get("/recent-orders", verifyAdmin, dashboardController.getRecentOrders);
router.get("/revenue-analytics", verifyAdmin, dashboardController.getRevenueAnalytics);

module.exports = router; 