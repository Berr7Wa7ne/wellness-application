// src/routes/public/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cartController');
const authMiddleware = require('../../middleware/authMiddleware');
const { validateAddToCart, validateUpdateCartItem } = require('../../middleware/validation/cartValidation');

// All cart routes require authentication
router.use(authMiddleware.authenticate);

// Get cart
router.get('/carts', cartController.getCart);

// Add item to cart
router.post('/carts/items', validateAddToCart, cartController.addToCart);

// Update cart item
router.put('/carts/items/:productId', validateUpdateCartItem, cartController.updateCartItem);

// Remove item from cart
router.delete('/carts/items/:productId', cartController.removeFromCart);

// Clear cart
router.delete('/carts', cartController.clearCart);

module.exports = router;