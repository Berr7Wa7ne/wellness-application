// src/controllers/serviceController.js
const serviceService = require("../services/serviceServices");

// Create a new service (Admin Only)
async function createService(req, res) {
    try {
        const service = await serviceService.createService(req.body);
        res.status(201).json({ message: "Service created successfully", service });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all services (Public)
async function getAllServices(req, res) {
    try {
        const services = await serviceService.getAllServices();
        res.status(200).json({ services });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a single service by ID (Public)
async function getServiceById(req, res) {
    try {
        const { serviceId } = req.params;
        const service = await serviceService.getServiceById(serviceId);
        res.status(200).json({ service });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update a service (Admin Only)
async function updateService(req, res) {
    try {
        const { serviceId } = req.params;
        const updates = req.body;
        const updatedService = await serviceService.updateService(serviceId, updates);
        res.status(200).json({ message: "Service updated successfully", updatedService });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a service (Admin Only)
async function deleteService(req, res) {
    try {
        const { serviceId } = req.params;
        const deletedService = await serviceService.deleteService(serviceId);
        res.status(200).json({ message: "Service deleted successfully", deletedService });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};
