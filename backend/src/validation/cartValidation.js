const { AppError } = require('../utils/errorHandler');

const validateCartItem = (req, res, next) => {
  const { productId, quantity } = req.body;

  // Check if productId exists and is valid
  if (!productId) {
    return next(new AppError('Product ID is required', 400));
  }

  // Check if quantity exists and is valid
  if (!quantity || typeof quantity !== 'number' || quantity < 1) {
    return next(new AppError('Valid quantity (minimum 1) is required', 400));
  }

  // If all validations pass, proceed to the next middleware/controller
  next();
};

module.exports = {
  validateCartItem
}; 