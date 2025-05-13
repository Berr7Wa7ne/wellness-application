const express = require('express');
const router = express.Router();
const videoController = require('../../controllers/videoController');
const authMiddleware = require('../../middleware/authMiddleware');

// Admin Routes (Protected)
router.post('/videos', authMiddleware.verifyAdmin, videoController.createVideo); // Create a new video
router.put('/videos/:videoId', authMiddleware.verifyAdmin, videoController.updateVideo); // Update a video
router.delete('/videos/:videoId', authMiddleware.verifyAdmin, videoController.deleteVideo); // Delete a video

module.exports = router;
