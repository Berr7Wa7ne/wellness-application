const express = require('express');
const router = express.Router();
const videoController = require('../../controllers/videoController');
const authMiddleware = require('../../middleware/authMiddleware');
const { validateCreateVideo, validateUpdateVideo } = require('../../middleware/validation/videoValidation');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// --- Flexible Storage Setup ---
console.log('=== Video Admin Routes Storage Setup ===');
console.log('STORAGE_TYPE environment variable:', process.env.STORAGE_TYPE);
console.log('NODE_ENV:', process.env.NODE_ENV);

let upload;
if (process.env.STORAGE_TYPE === 'cloudinary') {
  console.log('Using Cloudinary storage for videos');
  // Use Cloudinary storage for production
  const cloudinaryStorage = require('../../utils/cloudinaryStorage');
  upload = multer({ storage: cloudinaryStorage });
} else {
  console.log('Using local disk storage for videos');
  // Local storage (default for development)
  const uploadDir = 'uploads/videos';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  upload = multer({
    storage: storage,
    limits: {
      fileSize: 500 * 1024 * 1024 // 500MB limit (adjust as needed)
    },
    fileFilter: function (req, file, cb) {
      if (!file.mimetype.startsWith('video/') && !file.mimetype.startsWith('image/')) {
        return cb(new Error('Only video and image files are allowed!'), false);
      }
      cb(null, true);
    }
  });
}

// Admin Routes (Protected)
router.post('/videos',
  authMiddleware.verifyAdmin,
  (req, res, next) => {
    upload.single('file')(req, res, function(err) {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  },
  validateCreateVideo,
  videoController.createVideo
);

router.put('/videos/:id',
  authMiddleware.verifyAdmin,
  (req, res, next) => {
    upload.single('file')(req, res, function(err) {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  },
  validateUpdateVideo,
  videoController.updateVideo
);

router.delete('/videos/:id', authMiddleware.verifyAdmin, videoController.deleteVideo); // Delete a video

module.exports = router;
