// src/routes/admin/serviceAdminRoutes.js
const express = require("express");
const router = express.Router();
const serviceController = require("../../controllers/serviceController");
const authMiddleware = require("../../middleware/authMiddleware");
const { validateCreateService, validateUpdateService } = require("../../middleware/validation/serviceValidation");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads/services';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
}).single('image');

// Admin Routes (Protected)
router.get("/services", (req, res, next) => {
    console.log('GET /admin/services request received');
    console.log('Headers:', req.headers);
    authMiddleware.verifyAdmin(req, res, next);
}, serviceController.getAllServices);

// Add debug logging and handle multipart form data first
router.post("/services", 
    (req, res, next) => {
        console.log('=== POST /admin/services Request Received ===');
        console.log('Headers:', req.headers);
        next();
    },
    authMiddleware.verifyAdmin,
    (req, res, next) => {
        upload(req, res, function(err) {
            if (err) {
                console.error('File upload error:', err);
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            console.log('=== After File Upload ===');
            console.log('Body:', req.body);
            console.log('File:', req.file);
            next();
        });
    },
    validateCreateService,
    serviceController.createService
);

router.put("/services/:serviceId", 
    (req, res, next) => {
        console.log('=== PUT /admin/services/:serviceId Request Received ===');
        console.log('Headers:', req.headers);
        next();
    },
    authMiddleware.verifyAdmin,
    (req, res, next) => {
        upload(req, res, function(err) {
            if (err) {
                console.error('File upload error:', err);
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            console.log('=== After File Upload ===');
            console.log('Body:', req.body);
            console.log('File:', req.file);
            next();
        });
    },
    validateUpdateService,
    serviceController.updateService
);

router.delete("/services/:serviceId", authMiddleware.verifyAdmin, serviceController.deleteService); // Delete a service

module.exports = router;
