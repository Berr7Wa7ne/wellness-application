import React from 'react'
import { VideosCard } from './VideosCard';

// Sample image imports (replace with actual)
import video1 from '../../../assets/video1.png';
import video2 from '../../../assets/video2.png';
import video3 from '../../../assets/video3.png';
import video4 from '../../../assets/video4.png';

const videos = [
  {
    img: video1,
    title: 'Healing Practices',
    desc: 'CLASSWING',
  },
  {
    img: video2,
    title: 'Guided Meditations',
    desc: 'CLASSWING',
  },
  {
    img: video3,
    title: 'Sacred Teachings',
    desc: 'CLASSWING',
  },
  {
    img: video4,
    title: 'Rituals & Energy Work',
    desc: 'CLASSWING',
  },
];

export const VideoGrid = () => {
    const topRow = videos.slice(0, 2);  // First 2 items
    const bottomRow = videos.slice(0, 2);  // Remaining items
  
    return (
      <section className="px-6 md:px-20 py-16 space-y-12">
        {/* Top Row - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topRow.map((videos, index) => (
            <VideosCard key={index} {...videos} />
          ))}
        </div>
  
        {/* Bottom Row - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bottomRow.map((videos, index) => (
            <VideosCard key={index + 2} {...videos} />
          ))}
        </div>
      </section>
    );
  };
  