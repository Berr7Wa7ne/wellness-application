const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const PasswordResetToken = require("../models/PasswordResetToken");
const emailService = require("../utils/emailService");

// Register a new user
const registerUser = async (name, email, password) => {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return newUser;
};

// Login an existing user
const loginUser = async (email, password) => {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
    });

    return { user, token };
};

// Register a new admin
const registerAdmin = async (name, email, password) => {
    // Check if the admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
        throw new Error("Admin already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin
    const newAdmin = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return newAdmin;
};

// Login an existing admin
const loginAdmin = async (email, password) => {
    // Find the admin by email
    const adminUser = await User.findOne({ email });
    if (!adminUser) {
        throw new Error("Invalid email or password");
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, adminUser.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    // Generate a JWT token with admin role
    const token = jwt.sign({ userId: adminUser._id, role: "admin" }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
    });

    return { adminUser, token };
};

//Send password reset email
const sendPasswordResetEmail = async (email, frontendUrl) => {
    const user = await User.findOne({ email });
    console.log("This is the user", user)
    if (!user) throw new Error("User not found");

    // Generate a secure token
    const token = crypto.randomBytes(32).toString("hex");
    console.log("This is the generated token", token)

    const hashedToken = await bcrypt.hash(token, 10);  // Properly hash the token
    console.log("This is the hashedToken", hashedToken)


    console.log("Generated Token Length:", token.length); // Should be 64
    console.log("Hashed Token Length:", hashedToken.length); // Should be 60

    // Store the token
    await PasswordResetToken.create({
        userId: user._id,
        token: hashedToken,  // Store the hashed token
    });

    // Send the reset email
    const resetUrl = `${frontendUrl}/reset-password/${token}?userId=${user._id}`;
    console.log("This is the reset Url", resetUrl)
    const message = `
        Hi ${user.name},
        
        You requested a password reset. Click the link below to reset your password:
        
        ${resetUrl}
        
        If you did not request this, please ignore this email.
    `;

    await emailService.sendEmail(user.email, "Password Reset Request", message);
    return { message: "Password reset email sent" };
};

// Update the password
const resetPassword = async (userId, token, newPassword) => {
    // Fetch the reset token record
    const resetToken = await PasswordResetToken.findOne({ userId });
    console.log("Reset Token Record:", resetToken);

    if (!resetToken) throw new Error("Invalid or expired reset token");

    // Compare the raw token with the hashed token in the database
    const isValid = await bcrypt.compare(token.trim(), resetToken.token.trim());
    console.log("Is Valid:", isValid);

    if (!isValid) throw new Error("Invalid or expired reset token");

    console.log("Incoming Token (raw):", token);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    console.log("Incoming Token Length:", token.length); // Should be 64
    console.log("Stored Hashed Token Length:", resetToken.token.length); // Should be 60

    console.log("Trimmed Incoming Token:", token.trim());
    console.log("Trimmed Stored Hashed Token:", resetToken.token.trim());

    // Clean up the used token
    await PasswordResetToken.deleteOne({ userId });
    return { message: "Password reset successful" };
};

module.exports = { registerUser, loginUser, registerAdmin, loginAdmin, resetPassword, sendPasswordResetEmail};
