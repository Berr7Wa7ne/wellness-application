const { body, param } = require('express-validator');
const { validateRequest } = require('../validationMiddleware');

const validateTierId = [
  param('id').isMongoId().withMessage('Invalid tier ID'),
  validateRequest
];

const validateCreateTier = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
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
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('period')
    .notEmpty()
    .withMessage('Period is required')
    .isIn(['month', 'year'])
    .withMessage('Period must be either "month" or "year"'),
  body('features')
    .isArray({ min: 1 })
    .withMessage('Features must be a non-empty array'),
  body('features.*')
    .trim()
    .notEmpty()
    .withMessage('Feature cannot be empty'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  validateRequest
];

const validateUpdateTier = [
  param('id').isMongoId().withMessage('Invalid tier ID'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('backgroundColor')
    .optional()
    .isString()
    .withMessage('Background color must be a string'),
  body('textColor')
    .optional()
    .isString()
    .withMessage('Text color must be a string'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('period')
    .optional()
    .isIn(['month', 'year'])
    .withMessage('Period must be either "month" or "year"'),
  body('features')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Features must be a non-empty array'),
  body('features.*')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Feature cannot be empty'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  validateRequest
];

module.exports = {
  validateTierId,
  validateCreateTier,
  validateUpdateTier
}; 