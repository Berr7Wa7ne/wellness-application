// src/routes/admin/productAdminRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");
const authMiddleware = require("../../middleware/authMiddleware");
const { validateCreateProduct, validateUpdateProduct } = require("../../middleware/validation/productValidation");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// --- Flexible Storage Setup ---
let upload;
if (process.env.STORAGE_TYPE === 'cloudinary') {
  // Use Cloudinary storage for production
  const cloudinaryStorage = require('../../utils/cloudinaryStorage');
  upload = multer({ storage: cloudinaryStorage });
} else {
  // Local storage (default for development)
  const uploadDir = 'uploads/products';
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

// Admin-only routes
router.post("/products", authMiddleware.verifyAdmin, upload.single('image'), validateCreateProduct, productController.createProduct);
router.put("/products/:productId", authMiddleware.verifyAdmin, upload.single('image'), validateUpdateProduct, productController.updateProduct);
router.delete("/products/:productId", authMiddleware.verifyAdmin, productController.deleteProduct);
router.patch("/products/:productId/tier", authMiddleware.verifyAdmin, productController.updateProductTier);

module.exports = router;
