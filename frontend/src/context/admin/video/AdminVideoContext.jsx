import { createContext, useContext, useState } from 'react';
import api from '../../api/config';

const AdminVideoContext = createContext();

export const AdminVideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const [videosLoading, setVideosLoading] = useState(false);
    const [videosError, setVideosError] = useState(null);
    const [currentVideo, setCurrentVideo] = useState(null);

    const fetchVideos = async () => {
        setVideosLoading(true);
        setVideosError(null);
        console.log('[fetchVideos] Fetching videos...');
        try {
            const response = await api.get('/public/videos');
            console.log('[fetchVideos] Raw response:', response);
            console.log('[fetchVideos] Response data:', response.data);
            const videosData = Array.isArray(response.data) ? response.data : 
                             response.data.data ? response.data.data : [];
            console.log('[fetchVideos] Parsed videosData:', videosData);
            setVideos(videosData);
            console.log('[fetchVideos] setVideos called with:', videosData);
        } catch (err) {
            console.error('[fetchVideos] Fetch videos error:', err);
            setVideosError(err.response?.data?.message || 'Failed to fetch videos');
            setVideos([]);
            console.log('[fetchVideos] setVideos called with: [] (error case)');
            throw err;
        } finally {
            setVideosLoading(false);
            console.log('[fetchVideos] setVideosLoading(false)');
        }
    };

    const getVideo = async (id) => {
        try {
            const response = await api.get(`/public/videos/${id}`);
            setCurrentVideo(response.data);
            return response.data;
        } catch (err) {
            setVideosError(err.response?.data?.message || 'Failed to fetch video');
            throw err;
        }
    };

    const createVideo = async (videoData) => {
        try {
            console.log('=== Video Creation Start ===');
            
            // Log FormData contents for debugging
            console.log('Input video data contents:');
            for (let pair of videoData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            
            // Set the correct content type for file upload
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            
            const response = await api.post('/admin/videos', videoData, config);
            console.log('API Response:', {
                status: response.status,
                statusText: response.statusText,
                data: response.data,
                headers: response.headers
            });
            
            if (!response.data) {
                console.error('No data in response');
                throw new Error('No data received from server');
            }

            // Refetch all videos for consistency
            await fetchVideos();
            console.log('=== Video Creation Success ===');
            // Optionally return the new video data
            return response.data.data || response.data;
        } catch (err) {
            console.error('=== Video Creation Error ===');
            console.error('Error details:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                stack: err.stack
            });
            throw err.response?.data || err;
        }
    };

    const updateVideo = async (id, videoData) => {
        try {
            console.log('🔵 [1] Starting Video Update');
            console.log('Video ID:', id);
            
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            const response = await api.put(`/admin/videos/${id}`, videoData, config);
            
            const updatedVideo = response.data.data || response.data;
            console.log('Updated video data:', updatedVideo);

            setVideos(prevVideos => {
                return prevVideos.map(video => 
                    video._id === id ? updatedVideo : video
                );
            });
            
            if (currentVideo?._id === id) {
                setCurrentVideo(updatedVideo);
            }
            
            console.log('🔵 [2] Video Update Complete');
            return updatedVideo;
        } catch (err) {
            console.error('❌ Video Update Error:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status
            });
            setVideosError(err.response?.data?.message || 'Failed to update video');
            throw err;
        }
    };

    const deleteVideo = async (id) => {
        console.log('🗑️ [1] Starting Video Delete');
        console.log('Video ID:', id);
        
        try {
            console.log('🗑️ [2] Sending Delete Request');
            const response = await api.delete(`/admin/videos/${id}`);
            console.log('🗑️ [3] Delete Response:', response.data);
            
            console.log('🗑️ [4] Updating Local State');
            setVideos(prevVideos => {
                const updatedVideos = prevVideos.filter(video => video._id !== id);
                console.log('Videos after deletion:', updatedVideos);
                return updatedVideos;
            });
            
            if (currentVideo?._id === id) {
                console.log('🗑️ [5] Clearing Current Video');
                setCurrentVideo(null);
            }
            
            console.log('🗑️ [6] Video Delete Complete');
        } catch (err) {
            console.error('❌ Video Delete Error:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status
            });
            setVideosError(err.response?.data?.message || 'Failed to delete video');
            throw err;
        }
    };

    const value = {
        videos,
        videosLoading,
        videosError,
        currentVideo,
        fetchVideos,
        getVideo,
        createVideo,
        updateVideo,
        deleteVideo
    };

    return (
        <AdminVideoContext.Provider value={value}>
            {children}
        </AdminVideoContext.Provider>
    );
};

export const useAdminVideo = () => {
    const context = useContext(AdminVideoContext);
    if (!context) {
        throw new Error('useAdminVideo must be used within an AdminVideoProvider');
    }
    return context;
};

export default AdminVideoContext; 