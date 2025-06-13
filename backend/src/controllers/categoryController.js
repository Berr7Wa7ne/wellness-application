const categoryService = require("../services/categoryService");
const { catchAsync, AppError } = require('../utils/errorHandler');

// Create a new category
const createCategory = catchAsync(async (req, res) => {
    const { name, description } = req.body;
    const category = await categoryService.createCategory(name, description);
    res.status(201).json({ message: "Category created successfully", category });
});

// Get all categories
const getAllCategories = catchAsync(async (req, res) => {
    const categories = await categoryService.getAllCategories();
    res.json({
        success: true,
        data: categories
    });
});

// Get category by ID
const getCategory = catchAsync(async (req, res) => {
    const category = await categoryService.getCategory(req.params.id);
    if (!category) {
        throw new AppError('Category not found', 404);
    }
    res.json({
        success: true,
        data: category
    });
});

// Update category
const updateCategory = catchAsync(async (req, res) => {
    const { name, description } = req.body;
    const category = await categoryService.updateCategory(req.params.id, name, description);
    if (!category) {
        throw new AppError('Category not found', 404);
    }
    res.json({ message: "Category updated successfully", category });
});

// Delete category
const deleteCategory = catchAsync(async (req, res) => {
    const category = await categoryService.deleteCategory(req.params.id);
    if (!category) {
        throw new AppError('Category not found', 404);
    }
    res.json({
        success: true,
        message: 'Category deleted successfully'
    });
});

const categoryController = {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
};

module.exports = categoryController;
