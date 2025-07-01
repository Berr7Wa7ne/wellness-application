const { body } = require('express-validator');
const { validateRequest } = require('../validationMiddleware');

const validateCreateVideo = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Video title is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('duration')
    .trim()
    .notEmpty()
    .withMessage('Duration is required'),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['Draft', 'Scheduled', 'Published'])
    .withMessage('Status must be draft, scheduled, or published'),
  body('backgroundColor')
    .notEmpty()
    .withMessage('Background color is required'),
  body('textColor')
    .notEmpty()
    .withMessage('Text color is required'),
  body('published')
    .optional()
    .isISO8601()
    .withMessage('Published must be a valid date'),
  body('views')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Views must be a non-negative integer'),
  validateRequest
];

const validateUpdateVideo = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('category')
    .optional()
    .trim(),
  body('duration')
    .optional()
    .trim(),
  body('status')
    .optional()
    .isIn(['Draft', 'Scheduled', 'Published'])
    .withMessage('Status must be draft, scheduled, or published'),
    body('backgroundColor')
    .optional()
    .notEmpty()
    .withMessage('Background color is required'),
  body('textColor')
    .optional()
    .notEmpty()
    .withMessage('Text color is required'),
  body('published')
    .optional()
    .isISO8601()
    .withMessage('Published must be a valid date'),
  body('views')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Views must be a non-negative integer'),
  validateRequest
];

module.exports = {
  validateCreateVideo,
  validateUpdateVideo
}; 