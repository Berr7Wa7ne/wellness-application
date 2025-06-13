const { body } = require('express-validator');
const { validateRequest } = require('../validationMiddleware');

const validateAddToCart = [
  body('productId')
    .isMongoId()
    .withMessage('Valid product ID is required'),
  body('quantity')
    .isNumeric()
    .withMessage('Quantity must be a number')
    .custom((value) => {
      const num = Number(value);
      return Number.isInteger(num) && num > 0;
    })
    .withMessage('Quantity must be a positive whole number'),
  validateRequest
];

const validateUpdateCartItem = [
  body('quantity')
    .isNumeric()
    .withMessage('Quantity must be a number')
    .custom((value) => {
      const num = Number(value);
      return Number.isInteger(num) && num > 0;
    })
    .withMessage('Quantity must be a positive whole number'),
  validateRequest
];

module.exports = {
  validateAddToCart,
  validateUpdateCartItem
}; 