// pages/Services.jsx
import React from 'react';
import { Newsletter } from '../components/shared/Newsletter';
import { Footer } from '../components/layout/Footer';
import { VideosHero } from '../components/videos/VideosHero';
import { VideoGrid } from '../components/videos/VideosGrid';
import Navbar from '../components/layout/Navbar';

const Videos = () => {
  return (
    <div>
    <VideosHero>
      <Navbar />
    </VideosHero>
      <VideoGrid />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Videos;
