class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.details = details; // For validation errors or additional context
    
    Error.captureStackTrace(this, this.constructor);
  }

  // Optional: Add a static method for validation errors
  static validationError(errors) {
    return new AppError('Validation failed', 400, { errors });
  }
}

// For Express middleware/controllers
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// For service functions
const catchAsyncService = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(error.message || 'Internal server error', 500);
    }
  };
};

module.exports = {
  AppError,
  catchAsync,
  catchAsyncService
};
