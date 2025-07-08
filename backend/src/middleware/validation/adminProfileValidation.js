const { AppError } = require('../../utils/errorHandler');

const validateAdminProfileUpdate = (req, res, next) => {
    console.log('validateAdminProfileUpdate: req.body =', req.body); // Log incoming body
    const { name, email, phone, bio, password, profilePhoto } = req.body;

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new AppError('Invalid email format', 400);
    }

    // Validate phone format if provided (basic validation)
    if (phone && !/^\+?[\d\s-]{10,}$/.test(phone)) {
        throw new AppError('Invalid phone number format', 400);
    }

    // Validate name if provided
    if (name && name.trim().length < 2) {
        throw new AppError('Name must be at least 2 characters long', 400);
    }

    // Validate bio if provided
    if (bio && typeof bio !== 'string') {
        throw new AppError('Bio must be a string', 400);
    }

    // Validate password if provided
    if (password && password.length < 6) {
        throw new AppError('Password must be at least 6 characters long', 400);
    }

    // No validation for profilePhoto here (handled by upload middleware if any)

    next();
};

module.exports = {
    validateAdminProfileUpdate
}; 