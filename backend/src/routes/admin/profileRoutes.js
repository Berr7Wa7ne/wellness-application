const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../../middleware/authMiddleware');
const { validateAdminProfileUpdate } = require('../../middleware/validation/adminProfileValidation');
const adminProfileController = require('../../controllers/adminProfileController');
const upload = require('../../middleware/uploadMiddleware');

// Admin Profile Routes
router.get('/admin-profile', verifyAdmin, adminProfileController.getProfile);
router.put(
    '/admin-profile', 
    verifyAdmin,
    upload.single('profilePhoto'), 
    validateAdminProfileUpdate,  
    adminProfileController.updateProfile
);

module.exports = router; 