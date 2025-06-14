const { body } = require('express-validator');
const { validateRequest } = require('../validationMiddleware');

const validateCreateCategory = [
  body('categoryName')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Category name must be between 2 and 50 characters'),
  body('type')
    .optional()
    .isString()
    .withMessage('Type must be a string'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Category description is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('icon')
    .optional()
    .isString()
    .withMessage('Icon must be a string'),
  validateRequest
];

const validateUpdateCategory = [
  body('categoryName')
    .optional()
    .isString()
    .withMessage('Category name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Category name must be between 2 and 50 characters'),
  body('type')
    .optional()
    .isString()
    .withMessage('Type must be a string'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('icon')
    .optional()
    .isString()
    .withMessage('Icon must be a string'),
  validateRequest
];

module.exports = {
  validateCreateCategory,
  validateUpdateCategory
}; 