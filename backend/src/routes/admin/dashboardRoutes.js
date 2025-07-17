// backend/src/routes/admin/dashboardRoutes.js

const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/dashboardController");
const { verifyAdmin } = require("../../middleware/authMiddleware");

// Admin Dashboard Routes (Protected)
router.get("/stats", verifyAdmin, dashboardController.getDashboardStats);
router.get("/recent-activity", verifyAdmin, dashboardController.getRecentActivity);
router.get("/performance-overview", verifyAdmin, dashboardController.getPerformanceOverview);
router.get("/top-products", verifyAdmin, dashboardController.getTopProducts);
router.get("/user-engagement", verifyAdmin, dashboardController.getUserEngagement);

module.exports = router;