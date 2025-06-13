const { validationResult } = require('express-validator');
const { AppError } = require('../utils/errorHandler');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Get the first error message
    const firstError = errors.array()[0];
    throw new AppError(firstError.msg, 400);
  }
  next();
};

module.exports = {
  validateRequest
}; 