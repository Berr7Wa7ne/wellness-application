const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { AppError, catchAsyncService } = require('../utils/errorHandler');

// Get user's cart
const getUserCart = catchAsyncService(async (userId) => {
    const cart = await Cart.findOne({ user: userId })
        .populate({ path: 'items.productId', select: 'name price stock images' });

    if (!cart) {
        return { items: [], total: 0 };
    }

    const items = cart.items.map(item => ({
        id: item._id,
        product: item.productId,
        quantity: item.quantity,
        subtotal: item.productId.price * item.quantity
    }));

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    return { items, total };
});

// Add item to cart
const addToCart = catchAsyncService(async (userId, productId, quantity) => {
    // Convert quantity to number and validate
    const numQuantity = Number(quantity);
    if (!Number.isInteger(numQuantity) || numQuantity < 1) {
        throw new AppError('Quantity must be a positive whole number', 400);
    }

    // Check if product exists and has enough stock
    const product = await Product.findById(productId);
    if (!product) {
        throw new AppError('Product not found', 404);
    }
    if (product.stock < numQuantity) {
        throw new AppError('Insufficient stock', 400);
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
        if (product.stock < existingItem.quantity + numQuantity) {
            throw new AppError('Insufficient stock for requested quantity', 400);
        }
        existingItem.quantity += numQuantity;
    } else {
        cart.items.push({ productId, quantity: numQuantity });
    }
    await cart.save();

    return getUserCart(userId);
});

// Update cart item
const updateCartItem = catchAsyncService(async (userId, productId, quantity) => {
    // Convert quantity to number and validate
    const numQuantity = Number(quantity);
    if (!Number.isInteger(numQuantity) || numQuantity < 1) {
        throw new AppError('Quantity must be a positive whole number', 400);
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new AppError('Product not found', 404);
    }
    if (product.stock < numQuantity) {
        throw new AppError('Insufficient stock', 400);
    }
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new AppError('Cart not found', 404);
    }
    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) {
        throw new AppError('Item not found in cart', 404);
    }
    item.quantity = numQuantity;
    await cart.save();

    return getUserCart(userId);
});

// Remove item from cart
const removeFromCart = catchAsyncService(async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new AppError('Cart not found', 404);
    }
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    return getUserCart(userId);
});

// Clear cart
const clearCart = catchAsyncService(async (userId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new AppError('Cart not found', 404);
    }
    cart.items = [];
    await cart.save();

    return { items: [], total: 0 };
});

module.exports = {
    getUserCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};

