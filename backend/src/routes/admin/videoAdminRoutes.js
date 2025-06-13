const express = require('express');
const router = express.Router();
const videoController = require('../../controllers/videoController');
const authMiddleware = require('../../middleware/authMiddleware');
const { validateCreateVideo, validateUpdateVideo } = require('../../middleware/validation/videoValidation');

// Admin Routes (Protected)
router.post('/videos', authMiddleware.verifyAdmin, validateCreateVideo, videoController.createVideo); // Create a new video
router.put('/videos/:id', authMiddleware.verifyAdmin, validateUpdateVideo, videoController.updateVideo); // Update a video
router.delete('/videos/:id', authMiddleware.verifyAdmin, videoController.deleteVideo); // Delete a video

module.exports = router;
