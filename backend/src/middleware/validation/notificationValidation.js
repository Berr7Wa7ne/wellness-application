const { AppError } = require('../../utils/errorHandler');

const validateNotificationPreferences = (req, res, next) => {
    const { email, push, weekly, marketing } = req.body;

    // Validate that all fields are boolean if provided
    const validateBoolean = (field, value) => {
        if (value !== undefined && typeof value !== 'boolean') {
            throw new AppError(`${field} must be a boolean value`, 400);
        }
    };

    validateBoolean('email', email);
    validateBoolean('push', push);
    validateBoolean('weekly', weekly);
    validateBoolean('marketing', marketing);

    next();
};

module.exports = {
    validateNotificationPreferences
}; 