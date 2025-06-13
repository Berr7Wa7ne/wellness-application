const tierService = require("../services/tierService");
const { catchAsync, AppError } = require('../utils/errorHandler');

const tierController = {
    getAllTiers: catchAsync(async (req, res) => {
        const tiers = await tierService.getAllTiers();
        res.json({
            success: true,
            data: tiers
        });
    }),

    getTier: catchAsync(async (req, res) => {
        const tier = await tierService.getTier(req.params.id);
        if (!tier) {
            throw new AppError('Tier not found', 404);
        }
        res.json({
            success: true,
            data: tier
        });
    }),

    createTier: catchAsync(async (req, res) => {
        const { name, description, price, videoUrl } = req.body;
        const tier = await tierService.createTier(name, description, price, videoUrl);
        res.status(201).json({
            success: true,
            data: tier
        });
    }),

    updateTier: catchAsync(async (req, res) => {
        const { name, description, price, videoUrl } = req.body;
        const tier = await tierService.updateTier(req.params.id, name, description, price, videoUrl);
        if (!tier) {
            throw new AppError('Tier not found', 404);
        }
        res.json({
            success: true,
            data: tier
        });
    }),

    deleteTier: catchAsync(async (req, res) => {
        const tier = await tierService.deleteTier(req.params.id);
        if (!tier) {
            throw new AppError('Tier not found', 404);
        }
        res.json({
            success: true,
            message: 'Tier deleted successfully'
        });
    })
};

module.exports = tierController;
