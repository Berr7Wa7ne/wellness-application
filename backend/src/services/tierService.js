const Tier = require("../models/Tier");

// Create a new tier
async function createTier(name, description, price, videoUrl) {
    if (!name || !description || !price) {
        throw new Error("Name, description, and price are required.");
    }

    // Check for duplicate tier name
    const existingTier = await Tier.findOne({ name });
    if (existingTier) {
        throw new Error("Tier name already exists.");
    }

    const tier = new Tier({ name, description, price, videoUrl });
    return tier.save();
}

// Fetch all tiers
async function getAllTiers() {
    return Tier.find({});
}

// Get a single tier by ID
async function getTierById(id) {
    const tier = await Tier.findById(id);
    if (!tier) {
        throw new Error("Tier not found.");
    }
    return tier;
}

// Update a tier
async function updateTier(id, name, description, price, videoUrl) {
    const tier = await Tier.findById(id);
    if (!tier) {
        throw new Error("Tier not found.");
    }

    // Check for duplicate name if the name is being updated
    if (name && name !== tier.name) {
        const existingTier = await Tier.findOne({ name });
        if (existingTier) {
            throw new Error("Tier name already exists.");
        }
        tier.name = name;
    }

    if (description) tier.description = description;
    if (price) tier.price = price;
    if (videoUrl) tier.videoUrl = videoUrl;
    tier.updatedAt = Date.now();

    return tier.save();
}

// Delete a tier
async function deleteTier(id) {
    const tier = await Tier.findByIdAndDelete(id);
    if (!tier) {
        throw new Error("Tier not found.");
    }
    return tier;
}

module.exports = {
    createTier,
    getAllTiers,
    getTierById,
    updateTier,
    deleteTier
};
