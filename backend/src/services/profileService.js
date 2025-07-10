const User = require("../models/User");
const { AppError, catchAsyncService } = require("../utils/errorHandler");

// Get user profile
const getUserProfile = catchAsyncService(async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new AppError("User not found", 404);
    }
    return user;
});

// Update user profile
const updateUserProfile = catchAsyncService(async (userId, updates) => {
    const { name, email } = updates;

    // Check if email is being updated and if it's already taken
    if (email) {
        const existingUser = await User.findOne({ email, _id: { $ne: userId } });
        if (existingUser) {
            throw new AppError("Email already in use", 400);
        }
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { ...updates, updatedAt: Date.now() },
        { new: true }
    ).select('-password');

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
});

module.exports = {
    getUserProfile,
    updateUserProfile
}; 