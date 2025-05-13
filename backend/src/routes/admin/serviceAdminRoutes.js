// src/routes/admin/serviceAdminRoutes.js
const express = require("express");
const router = express.Router();
const serviceController = require("../../controllers/serviceController");
const authMiddleware = require("../../middleware/authMiddleware");

// Admin Routes (Protected)
router.post("/services", authMiddleware.verifyAdmin, serviceController.createService); // Create a new service
router.put("/services/:serviceId", authMiddleware.verifyAdmin, serviceController.updateService); // Update a service
router.delete("/services/:serviceId", authMiddleware.verifyAdmin, serviceController.deleteService); // Delete a service

module.exports = router;
