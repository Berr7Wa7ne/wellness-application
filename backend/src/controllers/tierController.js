const tierService = require("../services/tierService");
const { catchAsync, AppError } = require('../utils/errorHandler');

// Get all tiers
const getAllTiers = catchAsync(async (req, res) => {
    const tiers = await tierService.getAllTiers();
    res.json({
        success: true,
        data: tiers
    });
});

// Get a single tier
const getTier = catchAsync(async (req, res) => {
    const tier = await tierService.getTier(req.params.id);
    if (!tier) {
        throw new AppError('Tier not found', 404);
    }
    res.json({
        success: true,
        data: tier
    });
});

// Create a new tier
const createTier = catchAsync(async (req, res) => {
    const { name, description, price, videoUrl } = req.body;
    const tier = await tierService.createTier(name, description, price, videoUrl);
    res.status(201).json({
        success: true,
        data: tier
    });
});

// Update a tier
const updateTier = catchAsync(async (req, res) => {
    const { name, description, price, videoUrl } = req.body;
    const tier = await tierService.updateTier(req.params.id, name, description, price, videoUrl);
    if (!tier) {
        throw new AppError('Tier not found', 404);
    }
    res.json({
        success: true,
        data: tier
    });
});

// Delete a tier
const deleteTier = catchAsync(async (req, res) => {
    const tier = await tierService.deleteTier(req.params.id);
    if (!tier) {
        throw new AppError('Tier not found', 404);
    }
    res.json({
        success: true,
        message: 'Tier deleted successfully'
    });
});

const tierController = {
    getAllTiers,
    getTier,
    createTier,
    updateTier,
    deleteTier
};

module.exports = tierController;
