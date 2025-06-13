const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../../middleware/authMiddleware');
const { validateProfileUpdate } = require('../../middleware/validation/profileValidation');
const adminProfileController = require('../../controllers/adminProfileController');

// Admin Profile Routes
router.get('/admin-profile', verifyAdmin, adminProfileController.getProfile);
router.put('/admin-profile', verifyAdmin, validateProfileUpdate, adminProfileController.updateProfile);

module.exports = router; 