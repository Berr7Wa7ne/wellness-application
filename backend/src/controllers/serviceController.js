// src/controllers/serviceController.js
const serviceService = require("../services/serviceServices");
const { catchAsync, AppError } = require("../utils/errorHandler");
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads/services';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Create a new service (Admin Only)
const createService = catchAsync(async (req, res) => {
  console.log('=== Service Creation Request Started ===');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('File:', req.file);

  try {
    // Prepare service data with proper types
    const serviceData = {
      title: req.body.title,
      description: req.body.description,
      price: parseFloat(req.body.price),
      duration: parseInt(req.body.duration),
      tier: req.body.tier,
      audience: req.body.audience,
      isVideoAvailable: req.body.isVideoAvailable === 'true',
      image: req.file ? {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype
      } : null
    };

    console.log('=== Processed Service Data ===');
    console.log(serviceData);

    const service = await serviceService.createService(serviceData);
    
    console.log('=== Service Created Successfully ===');
    console.log(service);

    res.status(201).json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('=== Service Creation Error ===');
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode,
      details: error.details
    });
    
    // Clean up uploaded file if service creation fails
    if (req.file) {
      fs.unlink(req.file.path, (unlinkError) => {
        if (unlinkError) {
          console.error('Error deleting file:', unlinkError);
        }
      });
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
      errors: error.details?.errors || null
    });
  }
});

// Get all services (Public)
const getAllServices = catchAsync(async (req, res) => {
    const services = await serviceService.getAllServices();
    res.json({
        success: true,
        data: services
    });
});

// Get a single service by ID (Public)
const getService = catchAsync(async (req, res) => {
    const service = await serviceService.getService(req.params.id);
    if (!service) {
        throw new AppError('Service not found', 404);
    }
    res.json({
        success: true,
        data: service
    });
});

// Update a service (Admin Only)
const updateService = catchAsync(async (req, res) => {
    console.log('=== Service Update Request Started ===');
    console.log('Request params:', req.params);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Content-Length:', req.headers['content-length']);

    try {
        // File upload is already handled by route middleware
        console.log('=== Processing Request Data ===');
        console.log('Request body:', req.body);
        console.log('File details:', req.file);

        // Validate required fields
        const requiredFields = ['title', 'description', 'price', 'duration', 'tier', 'audience'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            throw new AppError(`Missing required fields: ${missingFields.join(', ')}`, 400);
        }

        // Prepare service data with proper types and validation
        const serviceData = {
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            price: parseFloat(req.body.price),
            duration: parseInt(req.body.duration),
            tier: req.body.tier.trim(),
            audience: req.body.audience.trim(),
            isVideoAvailable: req.body.isVideoAvailable === 'true'
        };

        // Only add image if a new one was uploaded
        if (req.file) {
            serviceData.image = {
                filename: req.file.filename,
                path: req.file.path,
                mimetype: req.file.mimetype
            };
        }

        // Validate numeric fields
        if (isNaN(serviceData.price) || serviceData.price <= 0) {
            throw new AppError('Invalid price value', 400);
        }
        if (isNaN(serviceData.duration) || serviceData.duration <= 0) {
            throw new AppError('Invalid duration value', 400);
        }

        console.log('=== Processed Service Data ===');
        console.log(serviceData);

        const service = await serviceService.updateService(req.params.serviceId, serviceData);
        
        console.log('=== Service Updated Successfully ===');
        console.log('Updated service:', service);

        res.json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error('=== Service Update Error ===');
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            statusCode: error.statusCode || 500,
            details: error.details
        });

        // Clean up uploaded file if service update fails
        if (req.file) {
            fs.unlink(req.file.path, (unlinkError) => {
                if (unlinkError) {
                    console.error('Error deleting file:', unlinkError);
                }
            });
        }

        // Ensure we always send a valid HTTP status code
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message,
            errors: error.details || null
        });
    }
});

// Delete a service (Admin Only)
const deleteService = catchAsync(async (req, res) => {
    console.log('=== Delete Service Request Started ===');
    console.log('Service ID:', req.params.serviceId);
    
    const service = await serviceService.deleteService(req.params.serviceId);
    if (!service) {
        throw new AppError('Service not found', 404);
    }
    
    console.log('=== Service Deleted Successfully ===');
    res.json({
        success: true,
        message: 'Service deleted successfully'
    });
});

const serviceController = {
    createService,
    getAllServices,
    getService,
    updateService,
    deleteService,
};

module.exports = serviceController;
