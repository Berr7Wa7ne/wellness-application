const Category = require("../models/Category");
const { AppError, catchAsyncService } = require('../utils/errorHandler');

// Create a new category
const createCategory = catchAsyncService(async (name, description) => {
    if (!name || !description) {
        throw new AppError("Name and description are required.", 400);
    }

    // Check for duplicate category name
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        throw new AppError("Category name already exists.", 409);
    }

    const category = new Category({ name, description });
    return category.save();
});

// Fetch all categories
const getAllCategories = catchAsyncService(async () => {
    return await Category.find({});
});

// Get a single category by ID
const getCategoryById = catchAsyncService(async (id) => {
    const category = await Category.findById(id);
    if (!category) {
        throw new AppError("Category not found.", 404);
    }
    return category;
});

// Update a category
const updateCategory = catchAsyncService(async (id, name, description) => {
    const category = await Category.findById(id);
    if (!category) {
        throw new AppError("Category not found.", 404);
    }

    // Check for duplicate name if the name is being updated
    if (name && name !== category.name) {
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            throw new AppError("Category name already exists.", 409);
        }
        category.name = name;
    }

    if (description) category.description = description;
    category.updatedAt = Date.now();

    return category.save();
});

// Delete a category
const deleteCategory = catchAsyncService(async (id) => {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        throw new AppError("Category not found.", 404);
    }
    return category;
});

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
