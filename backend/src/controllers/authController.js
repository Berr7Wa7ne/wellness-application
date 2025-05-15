// src/controllers/authController.js
const { registerUser, loginUser, registerAdmin, loginAdmin, sendPasswordResetEmail, resetPassword } = require("../services/authServices");

// Register a new user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await registerUser(name, email, password);
        res.status(201).json({
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login an existing user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);
        res.status(200).json({
            message: "Login successful",
            user,
            token,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Register a new admin
const registerAdminController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const admin = await registerAdmin(name, email, password);
        res.status(201).json({
            message: "Admin registered successfully",
            admin,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login an existing admin
const loginAdminController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { adminUser, token } = await loginAdmin(email, password);
        res.status(200).json({
            message: "Admin login successful",
            adminUser,
            token,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("Thi is the email", email)
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
        console.log("Frontend url", frontendUrl)
        const response = await sendPasswordResetEmail(email, frontendUrl);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const resetPasswordController  = async (req, res) => {
    try {
        const { userId, token, newPassword } = req.body;
        console.log("These are the request body", userId, token, newPassword)
        const response = await resetPassword(userId, token, newPassword);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { register, login, registerAdminController, loginAdminController, resetPasswordController, forgotPassword };
