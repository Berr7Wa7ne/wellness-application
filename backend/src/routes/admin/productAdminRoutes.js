// src/routes/admin/productAdminRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");
const authMiddleware = require("../../middleware/authMiddleware");
const { validateCreateProduct, validateUpdateProduct } = require("../../middleware/validation/productValidation");

// Admin-only routes
router.post("/products", authMiddleware.verifyAdmin, validateCreateProduct, productController.createProduct);
router.put("/products/:productId", authMiddleware.verifyAdmin, validateUpdateProduct, productController.updateProduct);
router.delete("/products/:productId", authMiddleware.verifyAdmin, productController.deleteProduct);
router.patch("/products/:productId/tier", authMiddleware.verifyAdmin, productController.updateProductTier);

module.exports = router;
