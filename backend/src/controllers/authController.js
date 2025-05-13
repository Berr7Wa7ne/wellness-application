// src/controllers/authController.js
const { registerUser, loginUser, registerAdmin, loginAdmin } = require("../services/authServices");

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

module.exports = { register, login, registerAdminController, loginAdminController };
