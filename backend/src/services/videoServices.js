const Video = require('../models/Video');
const { AppError, catchAsyncService } = require('../utils/errorHandler');

// Create a new video (Admin only)
const createVideo = catchAsyncService(async ({ title, description, category, url }) => {
    const newVideo = new Video({ title, description, category, url });
    await newVideo.save();
    return newVideo;
});

// Get all videos (Public)
const getAllVideos = catchAsyncService(async (category) => {
    const filter = category ? { category } : {};
    const videos = await Video.find(filter);
    return videos;
});

// Get a single video by ID (Public)
const getVideoById = catchAsyncService(async (videoId) => {
    const video = await Video.findById(videoId);
    if (!video) throw new AppError('Video not found', 404);
    return video;
});

// Update video details (Admin only)
const updateVideo = catchAsyncService(async (videoId, updates) => {
    const updatedVideo = await Video.findByIdAndUpdate(videoId, updates, { new: true });
    if (!updatedVideo) throw new AppError('Video not found', 404);
    return updatedVideo;
});

// Delete a video (Admin only)
const deleteVideo = catchAsyncService(async (videoId) => {
    const deletedVideo = await Video.findByIdAndDelete(videoId);
    if (!deletedVideo) throw new AppError('Video not found', 404);
    return deletedVideo;
});

module.exports = {
    createVideo,
    getAllVideos,
    getVideoById,
    updateVideo,
    deleteVideo
};
