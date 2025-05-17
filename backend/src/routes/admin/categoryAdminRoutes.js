const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryController");
const authMiddleware = require("../../middleware/authMiddleware");

// Category Routes (Admin Only)
router.post("/categories", authMiddleware.verifyAdmin, categoryController.createCategory);
router.get("/categories", authMiddleware.verifyAdmin, categoryController.getAllCategories);
router.get("/categories/category/:id", authMiddleware.verifyAdmin, categoryController.getCategoryById);
router.put("/categories/category/:id", authMiddleware.verifyAdmin, categoryController.updateCategory);
router.delete("/categories/category/:id", authMiddleware.verifyAdmin, categoryController.deleteCategory);

module.exports = router;
