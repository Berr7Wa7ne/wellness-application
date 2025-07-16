const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../../middleware/authMiddleware');
const { validateAdminProfileUpdate } = require('../../middleware/validation/adminProfileValidation');
const adminProfileController = require('../../controllers/adminProfileController');
const multer = require('multer');
let upload;

if (process.env.STORAGE_TYPE === 'cloudinary') {
  const cloudinaryStorage = require('../../utils/cloudinaryStorage');
  upload = multer({ storage: cloudinaryStorage });
} else {
  // Local storage (default for development)
  const path = require('path');
  const fs = require('fs');
  const uploadDir = 'uploads/profilePhotos';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  upload = multer({ storage: storage });
}

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