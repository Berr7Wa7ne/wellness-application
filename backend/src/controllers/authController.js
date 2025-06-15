// src/controllers/authController.js
const { registerUser, loginUser, sendPasswordResetEmail, resetPassword: resetPasswordService } = require("../services/authServices");
const { catchAsync } = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register a new user
const register = catchAsync(async (req, res) => {
    console.log('Registration attempt:', { 
        email: req.body.email,
        role: req.body.role,
        name: req.body.name
    });
    
    const { name, email, password, role } = req.body;
    const { message, user, token } = await registerUser({ name, email, password, role });
    
    console.log('Registration successful:', { email, role });
    
    res.status(201).json({
        success: true,
        message,
        data: {
            user,
            token
        }
    });
});

// Login user
const login = catchAsync(async (req, res) => {
    console.log('Login attempt:', { email: req.body.email });
    const { email, password, role } = req.body;
    const { user, token } = await loginUser({ email, password, role });
    console.log('Login successful:', { userId: user.id, role: user.role });
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
