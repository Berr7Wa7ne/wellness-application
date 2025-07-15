const videoService = require('../services/videoServices');
const { catchAsync, AppError } = require('../utils/errorHandler');

// Create a new video (Admin only)
const createVideo = catchAsync(async (req, res) => {
    console.log('=== [createVideo] req.body:', req.body);
    console.log('=== [createVideo] req.file:', req.file);
    const videoData = req.body;
    if (req.file) {
        videoData.image = {
            path: req.file.path,
            filename: req.file.filename,
            mimetype: req.file.mimetype
        };
        console.log('=== [createVideo] videoData.image set:', videoData.image);
    }
    const video = await videoService.createVideo(videoData);
    res.status(201).json({
        success: true,
        data: video
    });
    console.log('Image uploaded:', {
        filename: req.file?.originalname,
        savedPath: req.file?.path,
        fullUrl: video?.imageUrl
      });
});

// Get all videos (Public)
const getAllVideos = catchAsync(async (req, res) => {
    const videos = await videoService.getAllVideos();
    videos.forEach(video => {
        console.log('Returning video:', {
          id: video._id,
          imageUrl: video.imageUrl
        });
      });
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
    const updateData = req.body;
    if (req.file) {
        updateData.image = {
            path: req.file.path,
            filename: req.file.filename,
            mimetype: req.file.mimetype
        };
    }
    const video = await videoService.updateVideo(req.params.id, updateData);
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
