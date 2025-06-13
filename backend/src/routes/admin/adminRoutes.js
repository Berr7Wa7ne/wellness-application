const express = require('express');
const router = express.Router();
const profileRoutes = require('./profileRoutes');
const notificationRoutes = require('./notificationRoutes');

// Mount the routes
router.use('/profile', profileRoutes);
router.use('/notification-preferences', notificationRoutes);

module.exports = router; 