const { catchAsync } = require('../utils/errorHandler');
const { getAdminProfile, updateAdminProfile } = require('../services/adminProfileService');

const getProfile = catchAsync(async (req, res) => {
    const profile = await getAdminProfile(req.user.id);
    res.json({
        success: true,
        data: profile
    });
});

const updateProfile = catchAsync(async (req, res) => {
    const updatedProfile = await updateAdminProfile(req.user.id, req.body);
    res.json({
        success: true,
        data: updatedProfile
    });
});

module.exports = {
    getProfile,
    updateProfile
}; 