// src/controllers/authController.js
const { registerUser, loginUser, sendPasswordResetEmail, resetPassword } = require("../services/authServices");

// Register a new user
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log("This is the request body", req.body);

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ 
                message: "Missing required fields",
                details: {
                    name: !name ? "Name is required" : null,
                    email: !email ? "Email is required" : null,
                    password: !password ? "Password is required" : null
                }
            });
        }

        const user = await registerUser({ name, email, password, role });
        console.log("This is the user", user);
        
        res.status(201).json({
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({ 
            message: error.message || "Registration failed",
            error: error.message
        });
    }
};

// Login an existing user
const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log("This is the request body", req.body)
        const { user, token } = await loginUser({ email, password, role });
        console.log("This is the user", user, token)
        res.status(200).json({
            message: "Login successful",
            user,
            token,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(400).json({ error: error.message });
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

module.exports = { register, login, resetPasswordController, forgotPassword };
