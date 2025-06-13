const { AppError } = require('../utils/errorHandler');

const validateProduct = (req, res, next) => {
  const { name, price, description, categoryId } = req.body;

  if (!name) {
    return next(new AppError('Product name is required', 400));
  }

  if (!price || typeof price !== 'number' || price < 0) {
    return next(new AppError('Valid price is required', 400));
  }

  if (!description) {
    return next(new AppError('Product description is required', 400));
  }

  if (!categoryId) {
    return next(new AppError('Category ID is required', 400));
  }

  next();
};

module.exports = {
  validateProduct
}; 