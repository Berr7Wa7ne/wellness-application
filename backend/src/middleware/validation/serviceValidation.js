const { body, param } = require('express-validator');
const { validateRequest } = require('../validationMiddleware');

const validateServiceId = [
  param('id').isMongoId().withMessage('Invalid service ID'),
  validateRequest
];

const validateCreateService = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Service name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Service name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Service description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('duration')
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive number in minutes'),
  body('tieredPricing')
    .optional()
    .isArray()
    .withMessage('Tiered pricing must be an array if provided'),
  body('isVideoAvailable')
    .isBoolean()
    .withMessage('Video availability must be a boolean'),
  validateRequest
];

const validateUpdateService = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Service name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('duration')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive number in minutes'),
  body('tieredPricing')
    .optional()
    .isArray()
    .withMessage('Tiered pricing must be an array if provided'),
  body('isVideoAvailable')
    .optional()
    .isBoolean()
    .withMessage('Video availability must be a boolean'),
  validateRequest
];

module.exports = {
  validateServiceId,
  validateCreateService,
  validateUpdateService
}; 