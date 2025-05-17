const Category = require("../models/Category");

// Create a new category
async function createCategory(name, description) {
    if (!name || !description) {
        throw new Error("Name and description are required.");
    }

    // Check for duplicate category name
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        throw new Error("Category name already exists.");
    }

    const category = new Category({ name, description });
    return category.save();
}

// Fetch all categories
async function getAllCategories() {
    return Category.find({});
}

// Get a single category by ID
async function getCategoryById(id) {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error("Category not found.");
    }
    return category;
}

// Update a category
async function updateCategory(id, name, description) {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error("Category not found.");
    }

    // Check for duplicate name if the name is being updated
    if (name && name !== category.name) {
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            throw new Error("Category name already exists.");
        }
        category.name = name;
    }

    if (description) category.description = description;
    category.updatedAt = Date.now();

    return category.save();
}

// Delete a category
async function deleteCategory(id) {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        throw new Error("Category not found.");
    }
    return category;
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
