const Video = require('../models/Video');

// Create a new video (Admin only)
async function createVideo({ title, description, category, url }) {
    try {
        const newVideo = new Video({ title, description, category, url });
        await newVideo.save();
        return newVideo;
    } catch (error) {
        throw new Error('Error creating video: ' + error.message);
    }
}

// Get all videos (Public)
async function getAllVideos(category) {
    try {
        const filter = category ? { category } : {};
        const videos = await Video.find(filter);
        return videos;
    } catch (error) {
        throw new Error('Error fetching videos: ' + error.message);
    }
}

// Get a single video by ID (Public)
async function getVideoById(videoId) {
    try {
        const video = await Video.findById(videoId);
        if (!video) throw new Error('Video not found');
        return video;
    } catch (error) {
        throw new Error('Error fetching video: ' + error.message);
    }
}

// Update video details (Admin only)
async function updateVideo(videoId, updates) {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(videoId, updates, { new: true });
        if (!updatedVideo) throw new Error('Video not found');
        return updatedVideo;
    } catch (error) {
        throw new Error('Error updating video: ' + error.message);
    }
}

// Delete a video (Admin only)
async function deleteVideo(videoId) {
    try {
        const deletedVideo = await Video.findByIdAndDelete(videoId);
        if (!deletedVideo) throw new Error('Video not found');
        return deletedVideo;
    } catch (error) {
        throw new Error('Error deleting video: ' + error.message);
    }
}

module.exports = {
    createVideo,
    getAllVideos,
    getVideoById,
    updateVideo,
    deleteVideo
};
