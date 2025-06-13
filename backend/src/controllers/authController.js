// src/controllers/authController.js
const { registerUser, loginUser, sendPasswordResetEmail, resetPassword } = require("../services/authServices");
const { catchAsync, AppError } = require('../utils/errorHandler');

const authController = {
  register: catchAsync(async (req, res) => {
    const { name, email, password, role } = req.body;
    const message = await registerUser({ name, email, password, role });
    res.status(201).json({
      success: true,
      message
    });
  }),

  login: catchAsync(async (req, res) => {
    const { email, password, role } = req.body;
    const { user, token } = await loginUser({ email, password, role });
    res.json({
      success: true,
      data: { user, token }
    });
  }),

  forgotPassword: catchAsync(async (req, res) => {
    const { email } = req.body;
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const response = await sendPasswordResetEmail(email, frontendUrl);
    res.json({
      success: true,
      ...response
    });
  }),

  resetPassword: catchAsync(async (req, res) => {
    const { userId, token, newPassword } = req.body;
    const response = await resetPassword(userId, token, newPassword);
    res.json({
      success: true,
      ...response
    });
  })
};

module.exports = authController;
