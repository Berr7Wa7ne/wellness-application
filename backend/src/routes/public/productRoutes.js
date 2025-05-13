// src/routes/public/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");

// Public routes
router.get("/products", productController.getAllProducts);
router.get("/products/:productId", productController.getProductById);

module.exports = router;
