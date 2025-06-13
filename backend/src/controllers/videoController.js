const videoService = require('../services/videoServices');
const { catchAsync, AppError } = require('../utils/errorHandler');

// Create a new video (Admin only)
const createVideo = catchAsync(async (req, res) => {
    const video = await videoService.createVideo(req.body);
    res.status(201).json({
        success: true,
        data: video
    });
});

// Get all videos (Public)
const getAllVideos = catchAsync(async (req, res) => {
    const videos = await videoService.getAllVideos();
    res.json({
        success: true,
        data: videos
    });
});

// Get a single video by ID (Public)
const getVideo = catchAsync(async (req, res) => {
    const video = await videoService.getVideo(req.params.id);
    if (!video) {
        throw new AppError('Video not found', 404);
    }
    res.json({
        success: true,
        data: video
    });
});

// Update video details (Admin only)
const updateVideo = catchAsync(async (req, res) => {
    const video = await videoService.updateVideo(req.params.id, req.body);
    if (!video) {
        throw new AppError('Video not found', 404);
    }
    res.json({
        success: true,
        data: video
    });
});

// Delete a video (Admin only)
const deleteVideo = catchAsync(async (req, res) => {
    const video = await videoService.deleteVideo(req.params.id);
    if (!video) {
        throw new AppError('Video not found', 404);
    }
    res.json({
        success: true,
        message: 'Video deleted successfully'
    });
});

const videoController = {
    createVideo,
    getAllVideos,
    getVideo,
    updateVideo,
    deleteVideo
};

module.exports = videoController;
