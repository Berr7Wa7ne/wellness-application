const express = require('express');
const router = express.Router();
const tierController = require('../../controllers/tierController');
const { validateTierId } = require('../../middleware/validation/tierValidation');

// Public Tier Routes
router.get('/tier', tierController.getAllTiers);
router.get('/tier/:id', validateTierId, tierController.getTier);

module.exports = router; 