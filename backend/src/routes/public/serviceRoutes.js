// src/routes/public/serviceRoutes.js
const express = require("express");
const router = express.Router();
const serviceController = require("../../controllers/serviceController");

// Public Routes
router.get("/services", serviceController.getAllServices); // Get all services
router.get("/services/:serviceId", serviceController.getServiceById); // Get single service by ID

module.exports = router;
