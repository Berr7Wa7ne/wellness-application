const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

module.exports = { registerUser, loginUser, registerAdmin, loginAdmin };
