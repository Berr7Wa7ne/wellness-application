// src/services/serviceService.js
const Service = require("../models/Service");
const { AppError, catchAsyncService } = require('../utils/errorHandler');
const Tier = require("../models/Tier");
const mongoose = require('mongoose');

// Create a new service (Admin Only)
const createService = catchAsyncService(async (data) => {
    console.log('Service creation started with data:', {
        ...data,
        image: data.image ? 'Present' : 'Not present'
    });

    const errors = {};
    
    // String validations with trimming
    if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
        errors.title = 'Title is required';
    }
    if (!data.description || typeof data.description !== 'string' || !data.description.trim()) {
        errors.description = 'Description is required';
    }
    if (!data.tier || !mongoose.Types.ObjectId.isValid(data.tier)) {
        errors.tier = 'Tier is required and must be a valid ID';
    } else {
        // Optionally check if the Tier exists
        const tierExists = await Tier.exists({ _id: data.tier });
        if (!tierExists) {
            errors.tier = 'Tier does not exist';
        }
    }
    if (!data.audience || typeof data.audience !== 'string' || !data.audience.trim()) {
        errors.audience = 'Audience is required';
    }

    // Number validations
    const price = typeof data.price === 'number' ? data.price : parseFloat(data.price);
    const duration = typeof data.duration === 'number' ? data.duration : parseInt(data.duration);

    if (isNaN(price) || price <= 0) {
        errors.price = 'Price must be a valid number greater than 0';
    }
    if (isNaN(duration) || duration <= 0) {
        errors.duration = 'Duration must be a valid number greater than 0';
    }

    // Image validation
    if (!data.image || !data.image.filename || !data.image.path || !data.image.mimetype) {
        errors.image = 'Valid image file is required';
    }

    // Boolean validation
    const isVideoAvailable = typeof data.isVideoAvailable === 'boolean' 
        ? data.isVideoAvailable 
        : data.isVideoAvailable === 'true';

    if (Object.keys(errors).length > 0) {
        console.error('Validation errors:', errors);
        throw new AppError('Validation failed', 400, { errors });
    }

    // Log processed data
    console.log('Creating service with validated data:', {
        title: data.title,
        description: data.description,
        price,
        duration,
        tier: data.tier,
        audience: data.audience,
        isVideoAvailable,
        image: data.image ? {
            filename: data.image.filename,
            type: data.image.mimetype
        } : null
    });

    // Create service with properly typed data
    const service = await Service.create({
        title: data.title.trim(),
        description: data.description.trim(),
        duration: duration,
        tier: data.tier,
        price: price,
        audience: data.audience.trim(),
        isVideoAvailable: isVideoAvailable,
        image: {
            filename: data.image.filename,
            path: data.image.path,
            mimetype: data.image.mimetype
        }
    });

    console.log('Service created successfully:', { 
        id: service._id,
        title: service.title,
        price: service.price,
        duration: service.duration,
        image: service.image ? 'Present' : 'Not present'
    });

    return service;
});

// Get all services (Public)
const getAllServices = catchAsyncService(async () => {
    const services = await Service.find({});
    return services;
});

// Get a single service by ID (Public)
const getServiceById = catchAsyncService(async (serviceId) => {
    const service = await Service.findById(serviceId);
    if (!service) {
        throw new AppError("Service not found", 404);
    }
    return service;
});

// Update a service (Admin Only)
const updateService = catchAsyncService(async (serviceId, updates) => {
    if (updates.tier && !mongoose.Types.ObjectId.isValid(updates.tier)) {
        throw new AppError('Tier must be a valid ID', 400);
    }
    if (updates.tier) {
        const tierExists = await Tier.exists({ _id: updates.tier });
        if (!tierExists) {
            throw new AppError('Tier does not exist', 400);
        }
    }
    const service = await Service.findByIdAndUpdate(serviceId, updates, { new: true });
    if (!service) {
        throw new AppError("Service not found", 404);
    }
    return service;
});

// Delete a service (Admin Only)
const deleteService = catchAsyncService(async (serviceId) => {
    const service = await Service.findByIdAndDelete(serviceId);
    if (!service) {
        throw new AppError("Service not found", 404);
    }
    return service;
});

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};
