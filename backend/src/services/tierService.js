const Tier = require("../models/Tier");
const { AppError, catchAsyncService } = require('../utils/errorHandler');

// Create a new tier
const createTier = catchAsyncService(async (name, description, price, videoUrl) => {
    if (!name || !description || !price) {
        throw new AppError("Name, description, and price are required.", 400);
    }

    // Check for duplicate tier name
    const existingTier = await Tier.findOne({ name });
    if (existingTier) {
        throw new AppError("Tier name already exists.", 409);
    }

    const tier = new Tier({ name, description, price, videoUrl });
    return tier.save();
});

// Fetch all tiers
const getAllTiers = catchAsyncService(async () => {
    return await Tier.find({});
});

// Get a single tier by ID
const getTier = catchAsyncService(async (id) => {
    const tier = await Tier.findById(id);
    if (!tier) {
        throw new AppError("Tier not found.", 404);
    }
    return tier;
});

// Update a tier
const updateTier = catchAsyncService(async (id, name, description, price, videoUrl) => {
    const tier = await Tier.findById(id);
    if (!tier) {
        throw new AppError("Tier not found.", 404);
    }

    // Check for duplicate name if the name is being updated
    if (name && name !== tier.name) {
        const existingTier = await Tier.findOne({ name });
        if (existingTier) {
            throw new AppError("Tier name already exists.", 409);
        }
        tier.name = name;
    }

    if (description) tier.description = description;
    if (price) tier.price = price;
    if (videoUrl) tier.videoUrl = videoUrl;
    tier.updatedAt = Date.now();

    return tier.save();
});

// Delete a tier
const deleteTier = catchAsyncService(async (id) => {
    const tier = await Tier.findByIdAndDelete(id);
    if (!tier) {
        throw new AppError("Tier not found.", 404);
    }
    return tier;
});

module.exports = {
    createTier,
    getAllTiers,
    getTier,
    updateTier,
    deleteTier
};
