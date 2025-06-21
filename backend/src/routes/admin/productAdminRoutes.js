// src/routes/admin/productAdminRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");
const authMiddleware = require("../../middleware/authMiddleware");
const { validateCreateProduct, validateUpdateProduct } = require("../../middleware/validation/productValidation");

// Configure multer for file uploads
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Admin-only routes
router.post("/products", authMiddleware.verifyAdmin, upload.single('image'), validateCreateProduct, productController.createProduct);
router.put("/products/:productId", authMiddleware.verifyAdmin, upload.single('image'), validateUpdateProduct, productController.updateProduct);
router.delete("/products/:productId", authMiddleware.verifyAdmin, productController.deleteProduct);
router.patch("/products/:productId/tier", authMiddleware.verifyAdmin, productController.updateProductTier);

module.exports = router;
