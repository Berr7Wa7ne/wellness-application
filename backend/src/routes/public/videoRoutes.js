const express = require('express');
const router = express.Router();
const videoController = require('../../controllers/videoController');

// Public Routes
router.get('/videos', videoController.getAllVideos); // Get all videos
router.get('/videos/:videoId', videoController.getVideoById); // Get single video by ID


module.exports = router;
