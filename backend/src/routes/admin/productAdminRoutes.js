// src/routes/admin/productAdminRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");
const authMiddleware = require("../../middleware/authMiddleware");

// Admin-only routes
router.post("/products", authMiddleware.verifyAdmin, productController.createProduct);
router.put("/products/:productId", authMiddleware.verifyAdmin, productController.updateProduct);
router.delete("/products/:productId", authMiddleware.verifyAdmin, productController.deleteProduct);
router.patch("/products/:productId/tier", authMiddleware.verifyAdmin, productController.updateProductTier);

module.exports = router;
