// src/controllers/productController.js
const productService = require("../services/productServices");
const { catchAsync, AppError } = require('../utils/errorHandler');

// Create a new product (Admin only)
const createProduct = catchAsync(async (req, res) => {
    const product = await productService.createProduct(req.body);
    res.status(201).json({
        success: true,
        data: product
    });
});

// Get all products (Public)
const getAllProducts = catchAsync(async (req, res) => {
    const products = await productService.getAllProducts();
    res.json({
        success: true,
        data: products
    });
});

// Get a product by ID (Public)
const getProduct = catchAsync(async (req, res) => {
    const product = await productService.getProduct(req.params.id);
    if (!product) {
        throw new AppError('Product not found', 404);
    }
    res.json({
        success: true,
        data: product
    });
});

// Update a product (Admin only)
const updateProduct = catchAsync(async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) {
        throw new AppError('Product not found', 404);
    }
    res.json({
        success: true,
        data: product
    });
});

// Delete a product (Admin only)
const deleteProduct = catchAsync(async (req, res) => {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) {
        throw new AppError('Product not found', 404);
    }
    res.json({
        success: true,
        message: 'Product deleted successfully'
    });
});

// Update product tier (Admin only)
async function updateProductTier(req, res) {
    try {
        const updatedProduct = await productService.updateProductTier(req.params.productId, req.body.tier);
        res.status(200).json({ message: "Product tier updated successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const productController = {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    updateProductTier
};
module.exports = productController;

