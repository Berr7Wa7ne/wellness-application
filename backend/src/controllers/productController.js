// src/controllers/productController.js
const productService = require("../services/productServices");

// Create a new product (Admin only)
async function createProduct(req, res) {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all products (Public)
async function getAllProducts(req, res) {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a product by ID (Public)
async function getProductById(req, res) {
    try {
        const product = await productService.getProductById(req.params.productId);
        res.status(200).json({ product });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update a product (Admin only)
async function updateProduct(req, res) {
    try {
        const updatedProduct = await productService.updateProduct(req.params.productId, req.body);
        res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a product (Admin only)
async function deleteProduct(req, res) {
    try {
        await productService.deleteProduct(req.params.productId);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update product tier (Admin only)
async function updateProductTier(req, res) {
    try {
        const updatedProduct = await productService.updateProductTier(req.params.productId, req.body.tier);
        res.status(200).json({ message: "Product tier updated successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    updateProductTier
};
