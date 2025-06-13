const express = require("express");
const router = express.Router();
const profileController = require("../../controllers/profileController");
const { validateUpdateProfile } = require("../../middleware/validation/profileValidation");
const { authenticate } = require("../../middleware/authMiddleware");

// Profile Routes (Protected)
router.get("/profile", authenticate, profileController.getProfile);
router.put("/profile", authenticate, validateUpdateProfile, profileController.updateProfile);

module.exports = router; 