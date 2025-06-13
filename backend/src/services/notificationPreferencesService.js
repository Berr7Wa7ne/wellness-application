const NotificationPreferences = require('../models/NotificationPreferences');
const { AppError, catchAsyncService } = require('../utils/errorHandler');

const getNotificationPreferences = catchAsyncService(async (userId) => {
    let preferences = await NotificationPreferences.findOne({ userId });
    
    // If no preferences exist, create default ones
    if (!preferences) {
        preferences = await NotificationPreferences.create({ userId });
    }

    return {
        email: preferences.email,
        push: preferences.push,
        weekly: preferences.weekly,
        marketing: preferences.marketing
    };
});

const updateNotificationPreferences = catchAsyncService(async (userId, updateData) => {
    const allowedUpdates = ['email', 'push', 'weekly', 'marketing'];
    const updates = Object.keys(updateData)
        .filter(key => allowedUpdates.includes(key))
        .reduce((obj, key) => {
            obj[key] = updateData[key];
            return obj;
        }, {});

    const preferences = await NotificationPreferences.findOneAndUpdate(
        { userId },
        { $set: updates },
        { new: true, upsert: true, runValidators: true }
    );

    return {
        email: preferences.email,
        push: preferences.push,
        weekly: preferences.weekly,
        marketing: preferences.marketing
    };
});

module.exports = {
    getNotificationPreferences,
    updateNotificationPreferences
}; 