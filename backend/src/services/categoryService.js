const Category = require("../models/Category");
const { AppError, catchAsyncService } = require('../utils/errorHandler');

// Create a new category
const createCategory = catchAsyncService(async (name, description, type, backgroundColor, textColor, image = null) => {
    if (!name || !description || !backgroundColor || !textColor) {
        throw new AppError("Name, description, and colors are required.", 400);
    }

    // Check for duplicate category name
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        throw new AppError("Category name already exists.", 409);
    }

    const category = new Category({ 
        name, 
        description, 
        type, 
        backgroundColor, 
        textColor,
        image: image // Save image details if provided
    });
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
const updateCategory = catchAsyncService(async (id, name, description, type, backgroundColor, textColor, image = null) => {
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
    if (type) category.type = type;
    if (backgroundColor) category.backgroundColor = backgroundColor;
    if (textColor) category.textColor = textColor;
    
    // Update image if a new one was provided
    if (image) {
        category.image = image;
    }
    
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