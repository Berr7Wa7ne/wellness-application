// src/controllers/serviceController.js
const serviceService = require("../services/serviceServices");
const { catchAsync, AppError } = require("../utils/errorHandler");

// Create a new service (Admin Only)
const createService = catchAsync(async (req, res) => {
    const service = await serviceService.createService(req.body);
    res.status(201).json({
        success: true,
        data: service
    });
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
    const service = await serviceService.updateService(req.params.id, req.body);
    if (!service) {
        throw new AppError('Service not found', 404);
    }
    res.json({
        success: true,
        data: service
    });
});

// Delete a service (Admin Only)
const deleteService = catchAsync(async (req, res) => {
    const service = await serviceService.deleteService(req.params.id);
    if (!service) {
        throw new AppError('Service not found', 404);
    }
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
