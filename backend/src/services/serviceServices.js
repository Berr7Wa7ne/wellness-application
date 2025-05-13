// src/services/serviceService.js
const Service = require("../models/Service");

// Create a new service (Admin Only)
async function createService(data) {
    const { title, description, videoUrl } = data;
    
    // Ensure title is provided
    if (!title) {
        throw new Error("Title is required");
    }

    const service = await Service.create({ title, description, videoUrl });
    return service;
}

// Get all services (Public)
async function getAllServices() {
    const services = await Service.find({});
    return services;
}

// Get a single service by ID (Public)
async function getServiceById(serviceId) {
    const service = await Service.findById(serviceId);
    if (!service) {
        throw new Error("Service not found");
    }
    return service;
}

// Update a service (Admin Only)
async function updateService(serviceId, updates) {
    const service = await Service.findByIdAndUpdate(serviceId, updates, { new: true });
    if (!service) {
        throw new Error("Service not found");
    }
    return service;
}

// Delete a service (Admin Only)
async function deleteService(serviceId) {
    const service = await Service.findByIdAndDelete(serviceId);
    if (!service) {
        throw new Error("Service not found");
    }
    return service;
}

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};
