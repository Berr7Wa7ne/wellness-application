const { catchAsync } = require('../utils/errorHandler');
const { getAdminProfile, updateAdminProfile } = require('../services/adminProfileService');

const getProfile = catchAsync(async (req, res) => {
    console.log('getProfile: req.user =', req.user); // Log user object
    console.log('getProfile: req.user.id =', req.user.userId); // Log user id
    const profile = await getAdminProfile(req.user.userId);
    res.json({
        success: true,
        data: profile
    });
});

const updateProfile = catchAsync(async (req, res) => {
    // If a file was uploaded, set the profilePhoto path
    if (req.file) {
        req.body.profilePhoto = '/uploads/profilePhotos/' + req.file.filename;
    }
    console.log('updateProfile: req.user =', req.user); // Log user object
    console.log('updateProfile: req.user.id =', req.user.userId); // Log user id
    const updatedProfile = await updateAdminProfile(req.user.userId, req.body);
    res.json({
        success: true,
        data: updatedProfile
    });
});

module.exports = {
    getProfile,
    updateProfile
}; 