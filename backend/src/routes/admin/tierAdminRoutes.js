const express = require("express");
const router = express.Router();
const tierController = require("../../controllers/tierController");
const authMiddleware = require("../../middleware/authMiddleware");
const { validateTierId, validateCreateTier, validateUpdateTier } = require('../../middleware/validation/tierValidation');

// Tier Routes (Admin Only)
router.post("/tiers", authMiddleware.verifyAdmin, validateCreateTier, tierController.createTier);
router.get("/tiers", authMiddleware.verifyAdmin, tierController.getAllTiers);
router.get("/tiers/tier/:id", authMiddleware.verifyAdmin, validateTierId, tierController.getTier);
router.put("/tiers/tier/:id", authMiddleware.verifyAdmin, validateUpdateTier, tierController.updateTier);
router.delete("/tiers/tier/:id", authMiddleware.verifyAdmin, validateTierId, tierController.deleteTier);

module.exports = router;
