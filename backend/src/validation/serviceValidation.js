const { AppError } = require('../utils/errorHandler');

const validateService = (req, res, next) => {
  const { name, description, price, duration } = req.body;

  if (!name) {
    return next(new AppError('Service name is required', 400));
  }

  if (!description) {
    return next(new AppError('Service description is required', 400));
  }

  if (!price || typeof price !== 'number' || price < 0) {
    return next(new AppError('Valid price is required', 400));
  }

  if (!duration || typeof duration !== 'number' || duration < 0) {
    return next(new AppError('Valid duration is required', 400));
  }

  next();
};

module.exports = {
  validateService
}; 