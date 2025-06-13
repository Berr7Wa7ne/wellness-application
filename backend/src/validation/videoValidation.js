const { AppError } = require('../utils/errorHandler');

const validateVideo = (req, res, next) => {
  const { title, description, url } = req.body;

  if (!title) {
    return next(new AppError('Video title is required', 400));
  }

  if (!description) {
    return next(new AppError('Video description is required', 400));
  }

  if (!url) {
    return next(new AppError('Video URL is required', 400));
  }

  next();
};

module.exports = {
  validateVideo
}; 