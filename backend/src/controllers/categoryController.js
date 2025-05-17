const categoryService = require("../services/categoryService");

// Create a new category
async function createCategory(req, res) {
    try {
        const { name, description } = req.body;
        const category = await categoryService.createCategory(name, description);
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all categories
async function getAllCategories(req, res) {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get category by ID
async function getCategoryById(req, res) {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        res.json(category);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Update category
async function updateCategory(req, res) {
    try {
        const { name, description } = req.body;
        const category = await categoryService.updateCategory(req.params.id, name, description);
        res.json({ message: "Category updated successfully", category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete category
async function deleteCategory(req, res) {
    try {
        const category = await categoryService.deleteCategory(req.params.id);
        res.json({ message: "Category deleted successfully", category });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
