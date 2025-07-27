const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryController");

// Category Routes (Public)
router.get("/categories", (req, res, next) => {
    console.log('Public categories route hit');
    next();
  }, categoryController.getAllCategories);
router.get("/categories/:categoryId",  categoryController.getCategory);

module.exports = router;
