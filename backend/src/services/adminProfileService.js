const User = require('../models/User');
const { AppError, catchAsyncService } = require('../utils/errorHandler');
const bcrypt = require('bcryptjs');

const getAdminProfile = catchAsyncService(async (userId) => {
    console.log('getAdminProfile: userId =', userId); // Log userId
    const user = await User.findById(userId);
    console.log('getAdminProfile: user =', user); // Log user
    if (!user) {
        console.error('getAdminProfile: User not found for userId =', userId);
        throw new AppError('User not found', 404);
    }

    if (user.role !== 'admin') {
        console.error('getAdminProfile: Unauthorized access for userId =', userId, 'role =', user.role);
        throw new AppError('Unauthorized access', 403);
    }

    return {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        bio: user.bio,
        profilePhoto: user.profilePhoto,
        profilePhotoUrl: user.profilePhotoUrl
    };
});

const updateAdminProfile = catchAsyncService(async (userId, updateData) => {
    console.log('updateAdminProfile: userId =', userId, 'updateData =', updateData); // Log userId and updateData
    const user = await User.findById(userId);
    console.log('updateAdminProfile: user =', user); // Log user
    if (!user) {
        console.error('updateAdminProfile: User not found for userId =', userId);
        throw new AppError('User not found', 404);
    }

    if (user.role !== 'admin') {
        console.error('updateAdminProfile: Unauthorized access for userId =', userId, 'role =', user.role);
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
    console.log('updateAdminProfile: updatedUser =', updatedUser); // Log updatedUser

    return {
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        bio: updatedUser.bio,
        profilePhoto: updatedUser.profilePhoto,
        profilePhotoUrl: updatedUser.profilePhotoUrl
    };
});

module.exports = {
    getAdminProfile,
    updateAdminProfile
}; 