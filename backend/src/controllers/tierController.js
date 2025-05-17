const tierService = require("../services/tierService");

async function createTier(req, res) {
    try {
        const { name, description, price, videoUrl } = req.body;
        const tier = await tierService.createTier(name, description, price, videoUrl);
        res.status(201).json({ message: "Tier created successfully", tier });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAllTiers(req, res) {
    try {
        const tiers = await tierService.getAllTiers();
        res.json(tiers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTierById(req, res) {
    try {
        const tier = await tierService.getTierById(req.params.id);
        res.json(tier);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function updateTier(req, res) {
    try {
        const { name, description, price, videoUrl } = req.body;
        const tier = await tierService.updateTier(req.params.id, name, description, price, videoUrl);
        res.json({ message: "Tier updated successfully", tier });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteTier(req, res) {
    try {
        const tier = await tierService.deleteTier(req.params.id);
        res.json({ message: "Tier deleted successfully", tier });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = {
    createTier,
    getAllTiers,
    getTierById,
    updateTier,
    deleteTier
};
