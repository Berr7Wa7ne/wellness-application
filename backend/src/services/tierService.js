const Tier = require("../models/Tier");
const { AppError, catchAsyncService } = require('../utils/errorHandler');

// Create a new tier
const createTier = catchAsyncService(async (name, backgroundColor, textColor, price, period, features, isActive = true) => {
    if (!name || !price || !period || !features || !Array.isArray(features) || features.length === 0) {
        throw new AppError("Name, price, period, and features are required.", 400);
    }

    // Check for duplicate tier name
    const existingTier = await Tier.findOne({ name });
    if (existingTier) {
        throw new AppError("Tier name already exists.", 409);
    }

    const tier = new Tier({ name, backgroundColor, textColor, price, period, features, isActive });
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
const updateTier = catchAsyncService(async (id, name, backgroundColor, textColor, price, period, features, isActive) => {
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
    
    if (backgroundColor) tier.backgroundColor = backgroundColor;
    if (textColor) tier.textColor = textColor;
    if (price !== undefined) tier.price = price;
    if (period) tier.period = period;
    if (features && Array.isArray(features) && features.length > 0) tier.features = features;
    if (isActive !== undefined) tier.isActive = isActive;
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
