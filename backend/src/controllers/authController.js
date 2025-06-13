// src/controllers/authController.js
const { registerUser, loginUser, sendPasswordResetEmail, resetPassword: resetPasswordService } = require("../services/authServices");
const { catchAsync } = require('../utils/errorHandler');

// Register a new user
const register = catchAsync(async (req, res) => {
    const { name, email, password, role } = req.body;
    const message = await registerUser({ name, email, password, role });
    res.status(201).json({
        success: true,
        message
    });
});

// Login user
const login = catchAsync(async (req, res) => {
    const { email, password, role } = req.body;
    const { user, token } = await loginUser({ email, password, role });
    res.json({
        success: true,
        data: { user, token }
    });
});

// Send password reset email
const forgotPassword = catchAsync(async (req, res) => {
    const { email } = req.body;
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const response = await sendPasswordResetEmail(email, frontendUrl);
    res.json({
        success: true,
        ...response
    });
});

// Reset password
const resetPassword = catchAsync(async (req, res) => {
    const { userId, token, newPassword } = req.body;
    const response = await resetPasswordService(userId, token, newPassword);
    res.json({
        success: true,
        ...response
    });
});

const authController = {
    register,
    login,
    forgotPassword,
    resetPassword
};

module.exports = authController;
