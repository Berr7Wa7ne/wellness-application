const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryController");
const authMiddleware = require("../../middleware/authMiddleware");
const { validateCreateCategory, validateUpdateCategory } = require("../../middleware/validation/categoryValidation");
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configure Multer for file uploads with Cloudinary/local storage support
let upload;
if (process.env.STORAGE_TYPE === 'cloudinary') {
  console.log('Using Cloudinary storage for categories');
  // Use Cloudinary storage for production
  const cloudinaryStorage = require('../../utils/cloudinaryStorage');
  upload = multer({ storage: cloudinaryStorage });
} else {
  console.log('Using local disk storage for categories');
  // Local storage (default for development)
  const uploadDir = 'uploads/categories';
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
      fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: function (req, file, cb) {
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    }
  });
}

// Category Routes (Admin Only)
router.post("/categories", authMiddleware.verifyAdmin, upload.single('image'), validateCreateCategory, categoryController.createCategory);
router.get("/categories", authMiddleware.verifyAdmin, categoryController.getAllCategories);
router.get("/categories/:categoryId", authMiddleware.verifyAdmin, categoryController.getCategory);
router.put("/categories/:categoryId", authMiddleware.verifyAdmin, upload.single('image'), validateUpdateCategory, categoryController.updateCategory);
router.delete("/categories/:categoryId", authMiddleware.verifyAdmin, categoryController.deleteCategory);

module.exports = router;