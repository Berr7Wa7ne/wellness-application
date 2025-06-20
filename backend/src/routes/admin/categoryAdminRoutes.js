const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryController");
const authMiddleware = require("../../middleware/authMiddleware");
const { validateCreateCategory, validateUpdateCategory } = require("../../middleware/validation/categoryValidation");

// Category Routes (Admin Only)
router.post("/categories", authMiddleware.verifyAdmin, validateCreateCategory, categoryController.createCategory);
router.get("/categories", authMiddleware.verifyAdmin, categoryController.getAllCategories);
router.get("/categories/:categoryId", authMiddleware.verifyAdmin, categoryController.getCategory);
router.put("/categories/:categoryId", authMiddleware.verifyAdmin, validateUpdateCategory, categoryController.updateCategory);
router.delete("/categories/:categoryId", authMiddleware.verifyAdmin, categoryController.deleteCategory);

module.exports = router;
