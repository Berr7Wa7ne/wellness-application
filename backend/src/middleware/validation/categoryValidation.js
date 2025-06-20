const { body } = require('express-validator');
const { validateRequest } = require('../validationMiddleware');

const validateCreateCategory = [
    body('name')
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
    body('backgroundColor')
        .notEmpty()
        .withMessage('Background color is required')
        .isString()
        .withMessage('Background color must be a string'),
    body('textColor')
        .notEmpty()
        .withMessage('Text color is required')
        .isString()
        .withMessage('Text color must be a string'),
    body('items')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Items must be a non-negative number'),
    validateRequest
];

const validateUpdateCategory = [
    body('name')
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
    body('backgroundColor')
        .optional()
        .isString()
        .withMessage('Background color must be a string'),
    body('textColor')
        .optional()
        .isString()
        .withMessage('Text color must be a string'),
    body('items')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Items must be a non-negative number'),
    validateRequest
];

module.exports = {
    validateCreateCategory,
    validateUpdateCategory
};