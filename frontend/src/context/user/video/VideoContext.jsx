import { createContext, useContext, useState, useEffect } from 'react';
import api from '../../api/config';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/public/videos')
      .then(res => {
        console.log('Fetched videos:', res.data.data); // <-- Add this
        setVideos(res.data.data);
      })
      .catch(err => setError('Failed to fetch videos'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <VideoContext.Provider value={{ videos, loading, error }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideos = () => useContext(VideoContext); 