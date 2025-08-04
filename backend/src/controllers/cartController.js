// src/controllers/cartController.js
const cartService = require('../services/cartServices');
const { catchAsync, AppError } = require('../utils/errorHandler');

const cartController = {
    // Get user's cart
    getCart: catchAsync(async (req, res) => {
        const cart = await cartService.getUserCart(req.user.userId);
        res.json({
            success: true,
            data: cart
        });
    }),

    // Add item to cart
    addToCart: catchAsync(async (req, res) => {
        const { productId, quantity } = req.body;
        const cart = await cartService.addToCart(req.user.userId, productId, quantity);
        res.json({
            success: true,
            data: cart
        });
    }),

    // Update cart item
    updateCartItem: catchAsync(async (req, res) => {
        const { quantity } = req.body;
        const cart = await cartService.updateCartItem(
            req.user.userId,
            req.params.productId,
            quantity
        );
        res.json({
            success: true,
            data: cart
        });
    }),

    // Remove item from cart
    removeFromCart: catchAsync(async (req, res) => {
        const cart = await cartService.removeFromCart(
            req.user.userId,
            req.params.productId
        );
        res.json({
            success: true,
            data: cart
        });
    }),

    // Clear cart
    clearCart: catchAsync(async (req, res) => {
        const cart = await cartService.clearCart(req.user.userId);
        res.json({
            success: true,
            data: cart
        });
    })
};

module.exports = cartController;

