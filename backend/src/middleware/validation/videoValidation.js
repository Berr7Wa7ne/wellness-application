const { body } = require('express-validator');
const { validateRequest } = require('../validationMiddleware');

const validateCreateVideo = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Video title is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Video description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('url')
    .trim()
    .notEmpty()
    .withMessage('Video URL is required')
    .isURL()
    .withMessage('Valid URL is required'),
  validateRequest
];

const validateUpdateVideo = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('url')
    .optional()
    .trim()
    .isURL()
    .withMessage('Valid URL is required'),
  validateRequest
];

module.exports = {
  validateCreateVideo,
  validateUpdateVideo
}; 