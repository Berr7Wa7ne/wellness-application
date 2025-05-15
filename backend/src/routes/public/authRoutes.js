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

// Forgot Password
router.post("/forgot-password", authController.forgotPassword);

// Reset Password
router.post("/reset-password", authController.resetPasswordController);

module.exports = router;
