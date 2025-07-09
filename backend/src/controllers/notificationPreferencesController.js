const { catchAsync } = require('../utils/errorHandler');
const { getNotificationPreferences, updateNotificationPreferences } = require('../services/notificationPreferencesService');

const getPreferences = catchAsync(async (req, res) => {
    const preferences = await getNotificationPreferences(req.user.userId);
    res.json({
        success: true,
        data: preferences
    });
});

const updatePreferences = catchAsync(async (req, res) => {
    const updatedPreferences = await updateNotificationPreferences(req.user.userId, req.body);
    res.json({
        success: true,
        data: updatedPreferences
    });
});

module.exports = {
    getPreferences,
    updatePreferences
}; 