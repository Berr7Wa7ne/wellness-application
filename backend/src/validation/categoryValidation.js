const { AppError } = require('../utils/errorHandler');

const validateCategory = (req, res, next) => {
  const { name, description } = req.body;

  if (!name) {
    return next(new AppError('Category name is required', 400));
  }

  if (!description) {
    return next(new AppError('Category description is required', 400));
  }

  next();
};

module.exports = {
  validateCategory
}; 