// src/services/productService.js
const Product = require("../models/Product");

// Create a new product (Admin)
async function createProduct(data) {
    return await Product.create(data);
}

// Get all products (Public)
async function getAllProducts() {
    return await Product.find();
}

// Get product by ID (Public)
async function getProductById(productId) {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");
    return product;
}

// Update a product (Admin)
async function updateProduct(productId, updates) {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
    if (!updatedProduct) throw new Error("Product not found");
    return updatedProduct;
}

// Delete a product (Admin)
async function deleteProduct(productId) {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) throw new Error("Product not found");
    return deletedProduct;
}

// Tier management (Admin)
async function updateProductTier(productId, tier) {
    if (!["Basic", "Pro", "Premium"].includes(tier)) {
        throw new Error("Invalid tier value");
    }
    const product = await Product.findByIdAndUpdate(productId, { tier }, { new: true });
    if (!product) throw new Error("Product not found");
    return product;
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    updateProductTier
};
