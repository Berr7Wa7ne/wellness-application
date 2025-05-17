const express = require("express");
const router = express.Router();
const tierController = require("../../controllers/tierController");
const authMiddleware = require("../../middleware/authMiddleware");

// Tier Routes (Admin Only)
router.post("/tiers", authMiddleware.verifyAdmin, tierController.createTier);
router.get("/tiers", authMiddleware.verifyAdmin, tierController.getAllTiers);
router.get("/tiers/tier/:id", authMiddleware.verifyAdmin, tierController.getTierById);
router.put("/tiers/tier/:id", authMiddleware.verifyAdmin, tierController.updateTier);
router.delete("/tiers/tier/:id", authMiddleware.verifyAdmin, tierController.deleteTier);

module.exports = router;
