const videoService = require('../services/videoServices');

// Create a new video (Admin only)
async function createVideo(req, res) {
    try {
        const { title, description, category, url } = req.body;
        const video = await videoService.createVideo({ title, description, category, url });
        res.status(201).json({ message: 'Video created successfully', video });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all videos (Public)
async function getAllVideos(req, res) {
    try {
        const { category } = req.query;
        const videos = await videoService.getAllVideos(category);
        res.status(200).json({ videos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a single video by ID (Public)
async function getVideoById(req, res) {
    try {
        const { videoId } = req.params;
        const video = await videoService.getVideoById(videoId);
        res.status(200).json({ video });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update video details (Admin only)
async function updateVideo(req, res) {
    try {
        const { videoId } = req.params;
        const updates = req.body;
        const updatedVideo = await videoService.updateVideo(videoId, updates);
        res.status(200).json({ message: 'Video updated successfully', updatedVideo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a video (Admin only)
async function deleteVideo(req, res) {
    try {
        const { videoId } = req.params;
        const deletedVideo = await videoService.deleteVideo(videoId);
        res.status(200).json({ message: 'Video deleted successfully', deletedVideo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createVideo,
    getAllVideos,
    getVideoById,
    updateVideo,
    deleteVideo
};
