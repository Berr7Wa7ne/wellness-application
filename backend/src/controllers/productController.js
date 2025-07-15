// src/controllers/productController.js
const productService = require("../services/productServices");
const { catchAsync, AppError } = require('../utils/errorHandler');

// Create a new product (Admin only)
const createProduct = catchAsync(async (req, res) => {
    const productData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        tier: req.body.tier,
        stock: req.body.stock,
        backgroundColor: req.body.backgroundColor,
        textColor: req.body.textColor
    };

    // Handle file upload
    const imageFile = req.file;

    const product = await productService.createProduct(productData, imageFile);
    console.log('Image uploaded:', {
        filename: req.file?.originalname,
        savedPath: req.file?.path,
        fullUrl: product?.imageUrl
      });
    res.status(201).json({
        success: true,
        data: product
    });
});

// Get all products (Public)
const getAllProducts = catchAsync(async (req, res) => {
    const products = await productService.getAllProducts();
    products.forEach(product => {
        console.log('Returning product:', {
          id: product._id,
          imageUrl: product.imageUrl
        });
      });
    res.json({
        success: true,
        data: products
    });
});

// Get a product by ID (Public)
const getProduct = catchAsync(async (req, res) => {
    const product = await productService.getProductById(req.params.id);
    res.json({
        success: true,
        data: product
    });
});

// Update a product (Admin only)
const updateProduct = catchAsync(async (req, res) => {
    console.log('=== Product Update Request Started ===');
    console.log('Request params:', req.params);
    if (!req.params.productId) {
        console.error('No productId in request params!');
        return res.status(400).json({ message: 'Product ID is required in the URL.' });
    }
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    const productData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        tier: req.body.tier,
        stock: req.body.stock,
    };

    // Handle file upload
    const imageFile = req.file;

    try {
        const product = await productService.updateProduct(req.params.productId, productData, imageFile);
        console.log('=== Product Update Success ===');
        console.log('Updated product:', product);
        res.json({
            success: true,
            data: product
        });
        console.log('Image uploaded:', {
            filename: imageFile?.originalname,
            savedPath: imageFile?.path,
            fullUrl: product?.imageUrl
          });
    } catch (error) {
        console.error('=== Product Update Error ===');
        console.error('Error details:', {
            message: error.message,
            status: error.statusCode,
            stack: error.stack
        });
        throw error;
    }
});

// Delete a product (Admin only)
const deleteProduct = catchAsync(async (req, res) => {
    await productService.deleteProduct(req.params.productId);
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

