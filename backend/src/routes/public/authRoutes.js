// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");

// User Routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Admin Routes
router.post("/register-admin", authController.registerAdminController);
router.post("/login-admin", authController.loginAdminController);

module.exports = router;
