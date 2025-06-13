// src/services/productService.js
const Product = require("../models/Product");
const { AppError, catchAsyncService } = require('../utils/errorHandler');

// Create a new product (Admin)
const createProduct = catchAsyncService(async (data) => {
    return await Product.create(data);
});

// Get all products (Public)
const getAllProducts = catchAsyncService(async () => {
    return await Product.find();
});

// Get product by ID (Public)
const getProductById = catchAsyncService(async (productId) => {
    const product = await Product.findById(productId);
    if (!product) throw new AppError("Product not found", 404);
    return product;
});

// Update a product (Admin)
const updateProduct = catchAsyncService(async (productId, updates) => {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
    if (!updatedProduct) throw new AppError("Product not found", 404);
    return updatedProduct;
});

// Delete a product (Admin)
const deleteProduct = catchAsyncService(async (productId) => {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) throw new AppError("Product not found", 404);
    return deletedProduct;
});

// Tier management (Admin)
const updateProductTier = catchAsyncService(async (productId, tier) => {
    if (!["Basic", "Pro", "Premium"].includes(tier)) {
        throw new AppError("Invalid tier value", 400);
    }
    const product = await Product.findByIdAndUpdate(productId, { tier }, { new: true });
    if (!product) throw new AppError("Product not found", 404);
    return product;
});

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    updateProductTier
};
