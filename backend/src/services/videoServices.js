const Video = require('../models/Video');
const { AppError, catchAsyncService } = require('../utils/errorHandler');

// Create a new video (Admin only)
const createVideo = catchAsyncService(async (data) => {
    let { status, published } = data;
    if (status === 'Published') {
        published = new Date();
    } else if (status === 'Scheduled' && published) {
        published = new Date(published);
    } else if (status === 'Draft') {
        published = null;
    }
    console.log('=== [videoService.createVideo] image:', data.image);
    const newVideo = new Video({ ...data, published });
    await newVideo.save();
    await newVideo.populate('category');
    console.log('=== [videoService.createVideo] newVideo:', newVideo);
    return newVideo;
});

// Get all videos (Public)
const getAllVideos = catchAsyncService(async (category) => {
    const filter = category ? { category } : {};
    const videos = await Video.find(filter).populate('category');
    // On-the-fly scheduled publishing
    const now = new Date();
    videos.forEach(video => {
        if (
            video.status === 'Scheduled' &&
            video.published &&
            new Date(video.published) <= now
        ) {
            video.status = 'Published';
        }
    });
    return videos;
});

// Get a single video by ID (Public)
const getVideoById = catchAsyncService(async (videoId) => {
    const video = await Video.findById(videoId).populate('category');
    if (!video) throw new AppError('Video not found', 404);
    return video;
});

// Update video details (Admin only)
const updateVideo = catchAsyncService(async (videoId, updates) => {
    const allowedFields = ['title', 'category', 'duration', 'status', 'backgroundColor', 'textColor', 'published', 'views', 'image'];
    const updateData = {};
    for (const key of allowedFields) {
        if (updates[key] !== undefined) {
            updateData[key] = updates[key];
        }
    }
    // Handle published logic
    if (updateData.status === 'Published' && !updateData.published) {
        updateData.published = new Date();
    } else if (updateData.status === 'Scheduled' && updateData.published) {
        updateData.published = new Date(updateData.published);
    } else if (updateData.status === 'Draft') {
        updateData.published = null;
    }
    const updatedVideo = await Video.findByIdAndUpdate(videoId, updateData, { new: true });
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
