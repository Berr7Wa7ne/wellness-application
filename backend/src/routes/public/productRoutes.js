// src/routes/public/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");

// Public routes
router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProduct);

module.exports = router;
