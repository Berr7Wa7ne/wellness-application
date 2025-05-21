const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const PasswordResetToken = require("../models/PasswordResetToken");
const emailService = require("../utils/emailService");

const registerUser = async ({ name, email, password, role }) => {
    console.log("This is the role", role)
    if (!["user", "admin"].includes(role)) {
        throw new Error("Invalid role provided.");
    }

    // Validate admin registration
    if (role === 'admin') {
        const adminCode = process.env.ADMIN_REG_CODE;
        console.log("This is the adminCode", adminCode)
        if (!adminCode) {
            throw new Error("Admin registration is not configured.");
        }
        // Note: The admin code validation is now handled on the frontend
        // This is just an additional security check
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already exists.");
    }

    console.log("This is the existingUser", existingUser)

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("This is the hashedPassword", hashedPassword)

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    console.log("This is the user", user)

    return `${role} registered successfully.`;
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    console.log("This is the user", user)
    if (!user) {
        throw new Error("User not found.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials.");
    }

    console.log("This is the isMatch", isMatch)

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    );

    console.log("This is the token", token)

    // Return user object with sensitive data removed
    const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    };

    return { user: userResponse, token };
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

module.exports = { registerUser, loginUser, resetPassword, sendPasswordResetEmail};
