// src/routes/admin/serviceAdminRoutes.js
const express = require("express");
const router = express.Router();
const serviceController = require("../../controllers/serviceController");
const authMiddleware = require("../../middleware/authMiddleware");
const { validateCreateService, validateUpdateService } = require("../../middleware/validation/serviceValidation");

// Admin Routes (Protected)
router.post("/services", authMiddleware.verifyAdmin, validateCreateService, serviceController.createService); // Create a new service
router.put("/services/:serviceId", authMiddleware.verifyAdmin, validateUpdateService, serviceController.updateService); // Update a service
router.delete("/services/:serviceId", authMiddleware.verifyAdmin, serviceController.deleteService); // Delete a service

module.exports = router;
