const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const PasswordResetToken = require("../models/PasswordResetToken");
const emailService = require("../utils/emailService");
const { AppError, catchAsyncService } = require("../utils/errorHandler");

const registerUser = catchAsyncService(async ({ name, email, password, role }) => {
    console.log('Register service called for:', { email, role });
    
    if (!["user", "admin"].includes(role)) {
        console.log('Invalid role provided:', role);
        throw new AppError("Invalid role provided.", 400);
    }

    // Validate admin registration
    if (role === 'admin') {
        const adminCode = process.env.ADMIN_REG_CODE;
        if (!adminCode) {
            console.log('Admin registration not configured');
            throw new AppError("Admin registration is not configured.", 500);
        }
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log('Email already exists:', email);
        throw new AppError("Email already exists.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Get the user without password
    const userWithoutPassword = await User.findOne({ email }).select('-password');
    
    // Generate token with consistent payload
    const token = jwt.sign(
        { 
            userId: userWithoutPassword._id,
            email: userWithoutPassword.email,
            role: userWithoutPassword.role 
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h' }
    );

    console.log('User registered successfully:', { email, role });
    return {
        message: `${role} registered successfully.`,
        user: userWithoutPassword,
        token
    };
});

const loginUser = catchAsyncService(async ({ email, password }) => {
    console.log('Login service called for:', { email });
    
    const user = await User.findOne({ email });
    if (!user) {
        console.log('User not found:', { email });
        throw new AppError("User not found.", 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log('Invalid password for user:', { email });
        throw new AppError("Invalid credentials.", 401);
    }

    // Generate token with consistent payload
    const token = jwt.sign(
        { 
            userId: user._id,
            email: user.email,
            role: user.role 
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "24h" }
    );

    // Return user object with sensitive data removed
    const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    };

    console.log('Login successful for user:', { userId: user._id, role: user.role });
    return { user: userResponse, token };
});

const sendPasswordResetEmail = catchAsyncService(async (email, frontendUrl) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError("User not found", 404);
    }

    // Generate a secure token
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);

    // Store the token
    await PasswordResetToken.create({
        userId: user._id,
        token: hashedToken,
    });

    // Send the reset email
    const resetUrl = `${frontendUrl}/reset-password/${token}?userId=${user._id}`;
    const message = `
        Hi ${user.name},
        
        You requested a password reset. Click the link below to reset your password:
        
        ${resetUrl}
        
        If you did not request this, please ignore this email.
    `;

    await emailService.sendEmail(user.email, "Password Reset Request", message);
    return { message: "Password reset email sent" };
});

const resetPassword = catchAsyncService(async (userId, token, newPassword) => {
    // Fetch the reset token record
    const resetToken = await PasswordResetToken.findOne({ userId });
    if (!resetToken) {
        throw new AppError("Invalid or expired reset token", 400);
    }

    // Compare the raw token with the hashed token in the database
    const isValid = await bcrypt.compare(token.trim(), resetToken.token.trim());
    if (!isValid) {
        throw new AppError("Invalid or expired reset token", 400);
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    // Clean up the used token
    await PasswordResetToken.deleteOne({ userId });
    return { message: "Password reset successful" };
});

module.exports = { registerUser, loginUser, resetPassword, sendPasswordResetEmail };
