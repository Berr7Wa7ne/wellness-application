const mongoose = require('mongoose');

const notificationPreferencesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: Boolean,
        default: true
    },
    push: {
        type: Boolean,
        default: false
    },
    weekly: {
        type: Boolean,
        default: true
    },
    marketing: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Ensure one notification preferences document per user
notificationPreferencesSchema.index({ userId: 1 }, { unique: true });

const NotificationPreferences = mongoose.model('NotificationPreferences', notificationPreferencesSchema);

module.exports = NotificationPreferences; 