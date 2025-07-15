const profileService = require("../services/profileService");
const { catchAsync, AppError } = require("../utils/errorHandler");

// Get user profile
const getProfile = catchAsync(async (req, res) => {
    const profile = await profileService.getUserProfile(req.user.id);
    profile.forEach(profile => {
        console.log('Returning profile:', {
          id: profile._id,
          imageUrl: profile.imageUrl
        });
      });
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
    console.log('Image uploaded:', {
        filename: req.file?.originalname,
        savedPath: req.file?.path,
        fullUrl: profile?.profilePhotoUrl
      });
});

const profileController = {
    getProfile,
    updateProfile
};

module.exports = profileController; 