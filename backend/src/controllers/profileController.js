const profileService = require("../services/profileService");
const { catchAsync, AppError } = require("../utils/errorHandler");

// Get user profile
const getProfile = catchAsync(async (req, res) => {
    const profile = await profileService.getUserProfile(req.user.id);
    res.json({
        success: true,
        data: profile
    });
});

// Update user profile
const updateProfile = catchAsync(async (req, res) => {
    const profile = await profileService.updateUserProfile(req.user.id, req.body);
    res.json({
        success: true,
        data: profile
    });
});

const profileController = {
    getProfile,
    updateProfile
};

module.exports = profileController; 