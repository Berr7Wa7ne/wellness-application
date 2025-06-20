const { validationResult } = require('express-validator');
const { AppError } = require('../utils/errorHandler');

const validateRequest = (req, res, next) => {
  console.log('=== Validation Middleware Started ===');
  console.log('Request Body:', req.body);
  console.log('Request Files:', req.files || req.file);
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('=== Validation Errors Found ===');
    console.log('All Errors:', errors.array());
    // Get the first error message
    const firstError = errors.array()[0];
    console.log('First Error:', firstError);
    throw new AppError(firstError.msg, 400);
  }
  console.log('=== Validation Passed Successfully ===');
  next();
};

module.exports = {
  validateRequest
}; 