const Product = require("../models/Product");
const { AppError, catchAsyncService } = require('../utils/errorHandler');
const path = require('path');
const fs = require('fs');
const Tier = require("../models/Tier");
const mongoose = require('mongoose');

// Create a new product
const createProduct = catchAsyncService(async (productData, imageFile) => {
    const { name, description, price, category, tier, stock } = productData;

    if (!tier || !mongoose.Types.ObjectId.isValid(tier)) {
        throw new AppError('Tier is required and must be a valid ID', 400);
    } else {
        const tierExists = await Tier.exists({ _id: tier });
        if (!tierExists) {
            throw new AppError('Tier does not exist', 400);
        }
    }

    // Handle image file upload
    let imageData = null;
    if (imageFile) {
        const uploadDir = path.join(__dirname, '../../uploads/products');
        
        // Create upload directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = `${Date.now()}-${imageFile.originalname}`;
        const filePath = path.join(uploadDir, fileName);
        
        // Save file
        fs.writeFileSync(filePath, imageFile.buffer);
        
        imageData = {
            filename: fileName,
            path: `uploads/products/${fileName}`,
            contentType: imageFile.mimetype
        };
    }

    const product = new Product({
        name,
        description,
        price,
        category,
        tier,
        stock: stock || 0,
        image: imageData,
    });

    return product.save();
});

// Fetch all products
const getAllProducts = catchAsyncService(async () => {
    return await Product.find({});
});

// Get a single product by ID
const getProductById = catchAsyncService(async (id) => {
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product not found.", 404);
    }
    return product;
});

// Update a product
const updateProduct = catchAsyncService(async (id, productData, imageFile) => {
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product not found.", 404);
    }

    const { name, description, price, category, tier, stock } = productData;

    if (tier && !mongoose.Types.ObjectId.isValid(tier)) {
        throw new AppError('Tier must be a valid ID', 400);
    }
    if (tier) {
        const tierExists = await Tier.exists({ _id: tier });
        if (!tierExists) {
            throw new AppError('Tier does not exist', 400);
        }
    }

    // Handle image file upload if provided
    if (imageFile) {
        const uploadDir = path.join(__dirname, '../../uploads/products');
        
        // Create upload directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = `${Date.now()}-${imageFile.originalname}`;
        const filePath = path.join(uploadDir, fileName);
        
        // Save new file
        fs.writeFileSync(filePath, imageFile.buffer);
        
        // Delete old file if exists
        if (product.image && product.image.path) {
            const oldFilePath = path.join(__dirname, '../../', product.image.path);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }
        
        product.image = {
            filename: fileName,
            path: `uploads/products/${fileName}`,
            contentType: imageFile.mimetype
        };
    }

    // Update other fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (tier) product.tier = tier;
    if (stock !== undefined) product.stock = stock;
    return product.save();
});

// Delete a product
const deleteProduct = catchAsyncService(async (productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new AppError("Product not found.", 404);
    }

    // Delete associated image file
    if (product.image && product.image.path) {
        const filePath = path.join(__dirname, '../../', product.image.path);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

    return Product.findByIdAndDelete(productId);
});

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}; 