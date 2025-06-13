const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../../middleware/authMiddleware');
const { validateNotificationPreferences } = require('../../middleware/validation/notificationValidation');
const notificationPreferencesController = require('../../controllers/notificationPreferencesController');

// Notification Preferences Routes
router.get('/notification', verifyAdmin, notificationPreferencesController.getPreferences);
router.put('/notification', verifyAdmin, validateNotificationPreferences, notificationPreferencesController.updatePreferences);

module.exports = router; 