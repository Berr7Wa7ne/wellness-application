// src/controllers/authController.js
const { registerUser, loginUser, sendPasswordResetEmail, resetPassword: resetPasswordService, verifyToken: verifyTokenService } = require("../services/authServices");
const { catchAsync } = require('../utils/errorHandler');

// Register a new user
const register = catchAsync(async (req, res) => {
    console.log('Registration attempt:', { 
        email: req.body.email,
        role: req.body.role,
        name: req.body.name
    });
    
    const { name, email, password, role, phone, bio, adminCode } = req.body;
    let profilePhoto = null;
    if (req.file) {
        profilePhoto = `/uploads/profilePhotos/${req.file.filename}`;
    }
    const { message, user, token } = await registerUser({ name, email, password, role, phone, bio, adminCode, profilePhoto });
    
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

// Verify token
const verifyToken = catchAsync(async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    const { user } = await verifyTokenService(token);
    
    res.json({
        success: true,
        user
    });
});

const authController = {
    register,
    login,
    forgotPassword,
    resetPassword,
    verifyToken
};

module.exports = authController;
