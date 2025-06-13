const User = require('../models/User');
const { AppError, catchAsyncService } = require('../utils/errorHandler');
const bcrypt = require('bcryptjs');

const getAdminProfile = catchAsyncService(async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    if (user.role !== 'admin') {
        throw new AppError('Unauthorized access', 403);
    }

    return {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        bio: user.bio,
        profilePhoto: user.profilePhoto
    };
});

const updateAdminProfile = catchAsyncService(async (userId, updateData) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    if (user.role !== 'admin') {
        throw new AppError('Unauthorized access', 403);
    }

    // Handle password update if provided
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // Update allowed fields
    const allowedUpdates = ['name', 'email', 'phone', 'bio', 'password', 'profilePhoto'];
    const updates = Object.keys(updateData)
        .filter(key => allowedUpdates.includes(key))
        .reduce((obj, key) => {
            obj[key] = updateData[key];
            return obj;
        }, {});

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true }
    );

    return {
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        bio: updatedUser.bio,
        profilePhoto: updatedUser.profilePhoto
    };
});

module.exports = {
    getAdminProfile,
    updateAdminProfile
}; 