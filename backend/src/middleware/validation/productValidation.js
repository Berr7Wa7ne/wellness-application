const { body } = require('express-validator');
const { validateRequest } = require('../validationMiddleware');

const validateCreateProduct = [
  body('productName')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Valid category ID is required'),
  body('tier')
    .optional()
    .isString()
    .withMessage('Tier must be a string'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number if provided'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative number'),
  body('imageUrl')
    .optional()
    .isString()
    .withMessage('Image URL must be a string'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  validateRequest
];

const validateUpdateProduct = [
  body('productName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),
  body('category')
    .optional()
    .trim()
    .isMongoId()
    .withMessage('Valid category ID is required'),
  body('tier')
    .optional()
    .isString()
    .withMessage('Tier must be a string'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number if provided'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative number'),
  body('imageUrl')
    .optional()
    .isString()
    .withMessage('Image URL must be a string'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  validateRequest
];

module.exports = {
  validateCreateProduct,
  validateUpdateProduct
}; 