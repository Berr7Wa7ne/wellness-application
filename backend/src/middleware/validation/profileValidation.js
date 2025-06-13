const { body } = require('express-validator');
const { validateRequest } = require('../validationMiddleware');

const validateUpdateProfile = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    
    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address'),
    
    validateRequest
];

module.exports = {
    validateUpdateProfile
}; 