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
        if (process.env.STORAGE_TYPE === 'cloudinary') {
            // Cloudinary: use the URL and public_id
            imageData = {
                filename: imageFile.filename, // Cloudinary public_id
                path: imageFile.path,         // Cloudinary URL
                contentType: imageFile.mimetype
            };
        } else {
            // Local: file is already saved to disk by multer.diskStorage
            imageData = {
                filename: imageFile.filename,
                path: imageFile.path.startsWith('uploads/') ? imageFile.path : `uploads/products/${imageFile.filename}`,
                contentType: imageFile.mimetype
            };
        }
        console.log('Image data being saved (create):', imageData);
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
        if (process.env.STORAGE_TYPE === 'cloudinary') {
            // Cloudinary: just update the image data
            product.image = {
                filename: imageFile.filename,
                path: imageFile.path,
                contentType: imageFile.mimetype
            };
        } else {
            // Local: file is already saved to disk by multer.diskStorage
            // Optionally, delete the old file if it exists
            if (product.image && product.image.path) {
                const oldFilePath = path.join(__dirname, '../../', product.image.path);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }
            product.image = {
                filename: imageFile.filename,
                path: imageFile.path.startsWith('uploads/') ? imageFile.path : `uploads/products/${imageFile.filename}`,
                contentType: imageFile.mimetype
            };
        }
        console.log('Image data being saved (update):', product.image);
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