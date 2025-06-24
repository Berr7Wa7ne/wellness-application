const { body, param } = require('express-validator');
const { validateRequest } = require('../validationMiddleware');

const validateServiceId = [
  param('id').isMongoId().withMessage('Invalid service ID'),
  validateRequest
];

const validateCreateService = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Service title is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Service title must be between 2 and 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Service description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('duration')
    .notEmpty()
    .withMessage('Duration is required')
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive number in minutes'),
  body('tier')
    .notEmpty()
    .withMessage('Tier is required')
    .isMongoId()
    .withMessage('Tier must be a valid ID'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('audience')
    .notEmpty()
    .withMessage('Audience is required'),
  body('isVideoAvailable')
    .isBoolean()
    .withMessage('Video availability must be a boolean'),
  validateRequest
];

const validateUpdateService = [
  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Service title must be between 2 and 100 characters'),
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
  body('tier')
    .optional()
    .isMongoId()
    .withMessage('Tier must be a valid ID'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('audience')
    .optional()
    .isString()
    .withMessage('Audience must be a string'),
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