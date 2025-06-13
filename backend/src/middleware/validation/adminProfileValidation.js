const { AppError } = require('../../utils/errorHandler');

const validateAdminProfileUpdate = (req, res, next) => {
    const { name, email, phone, role, permissions } = req.body;

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

    // Validate role if provided
    if (role && !['admin', 'super_admin'].includes(role)) {
        throw new AppError('Invalid role specified', 400);
    }

    // Validate permissions if provided
    if (permissions && !Array.isArray(permissions)) {
        throw new AppError('Permissions must be an array', 400);
    }

    if (permissions && permissions.some(perm => typeof perm !== 'string')) {
        throw new AppError('All permissions must be strings', 400);
    }

    next();
};

module.exports = {
    validateAdminProfileUpdate
}; 