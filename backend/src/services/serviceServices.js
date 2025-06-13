// src/services/serviceService.js
const Service = require("../models/Service");
const { AppError, catchAsyncService } = require('../utils/errorHandler');

// Create a new service (Admin Only)
const createService = catchAsyncService(async (data) => {
    const { title, description, videoUrl } = data;
    
    // Ensure title is provided
    if (!title) {
        throw new AppError("Title is required", 400);
    }

    const service = await Service.create({ title, description, videoUrl });
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
