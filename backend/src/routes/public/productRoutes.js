// src/routes/public/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");

// Public routes
router.get("/products", productController.getAllProducts);
router.get("/products/preview", productController.getPreviewProducts); // New preview route
router.get("/products/slug/:slug", productController.getProductBySlug); // Slug route
router.get("/products/related/:category/:excludeId", productController.getRelatedProducts); // Related products route
router.get("/products/:id", productController.getProduct);

module.exports = router;
