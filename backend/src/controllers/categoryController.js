const categoryService = require("../services/categoryService");
const { catchAsync, AppError } = require('../utils/errorHandler');

// Create a new category
const createCategory = catchAsync(async (req, res) => {
    console.log('=== CREATE CATEGORY DEBUG ===');
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    
    const { name, description, type, backgroundColor, textColor } = req.body;
    
    // Handle image upload
    const image = req.file ? {
        filename: req.file.filename,
        path: req.file.path,
        contentType: req.file.mimetype
    } : null;

    console.log('Extracted data:', { name, description, type, backgroundColor, textColor, image });

    const category = await categoryService.createCategory(name, description, type, backgroundColor, textColor, image);
    res.status(201).json({ message: "Category created successfully", category });
});

// Get all categories
const getAllCategories = catchAsync(async (req, res) => {
    console.log('getAllCategories called');
    const categories = await categoryService.getAllCategories();
    res.json({
        success: true,
        data: categories
    });
});

// Get category by ID
const getCategory = catchAsync(async (req, res) => {
    const category = await categoryService.getCategoryById(req.params.categoryId);
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
    console.log('=== UPDATE CATEGORY DEBUG ===');
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    
    const { name, description, type, backgroundColor, textColor } = req.body;
    
    // Handle image upload
    const image = req.file ? {
        filename: req.file.filename,
        path: req.file.path,
        contentType: req.file.mimetype
    } : null;

    console.log('Extracted data:', { name, description, type, backgroundColor, textColor, image });

    const category = await categoryService.updateCategory(req.params.categoryId, name, description, type, backgroundColor, textColor, image);
    if (!category) {
        throw new AppError('Category not found', 404);
    }
    res.json({ message: "Category updated successfully", category });
});

// Delete category
const deleteCategory = catchAsync(async (req, res) => {
    const category = await categoryService.deleteCategory(req.params.categoryId);
    if (!category) {
        throw new AppError('Category not found', 404);
    }
    res.json({
        success: true,
        message: 'Category deleted successfully'
    });
});

module.exports = {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
};
