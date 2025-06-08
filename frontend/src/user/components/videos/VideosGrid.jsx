import React, { useState, useEffect, useRef } from 'react';
import { VideosCard } from './VideosCard';
import CategoryNavigation from '../shared/CategoryNavigation';
import Pagination from '../shared/Pagination';

// Meditation Videos
import morningMindfulness from '../../../assets/Morning Mindfulness.jpg';
import deepSleepJourney from '../../../assets/Deep Sleep Journey.jpg';
import stressRelief from '../../../assets/Stress Relief Session.jpg';
import chakraBalancing from '../../../assets/Chakra Balancing.jpg';
import anxietyRelief from '../../../assets/Anxiety Relief.jpg';
import manifestationPractice from '../../../assets/Manifestation Practice.jpg';
import bodyScanRelaxation from '../../../assets/Body Scan Relaxation.jpg';
import gratitudeMeditation from '../../../assets/Gratitude Meditation.jpg';
import energyClearingVideo from '../../../assets/Energy Clearing.jpg';

// Audio Guides
import chakraBalancingAudio from '../../../assets/Chakra Balancing Audio.jpg';
import manifestationAffirmations from '../../../assets/Manifestation Affirmations.jpg';
import healingFrequencyTones from '../../../assets/Healing Frequency Tones.jpg';
import guidedVisualization from '../../../assets/Guided Visualization.jpg';
import sleepSoundscapes from '../../../assets/Sleep Soundscapes.jpg';
import meditationMusic from '../../../assets/Meditation Music.jpg';
import natureSounds from '../../../assets/Nature Sounds.jpg';
import binauralBeats from '../../../assets/Binaural Beats.jpg';
import sacredMantras from '../../../assets/Sacred Mantras.jpg';

const meditationVideos = [
  {
    img: morningMindfulness,
    title: 'Morning Mindfulness',
    desc: '15 min',
  },
  {
    img: deepSleepJourney,
    title: 'Deep Sleep Journey',
    desc: '30 min',
  },
  {
    img: stressRelief,
    title: 'Stress Relief Session',
    desc: '20 min',
  },
  {
    img: chakraBalancing,
    title: 'Chakra Balancing',
    desc: '45 min',
  },
  {
    img: anxietyRelief,
    title: 'Anxiety Relief',
    desc: '25 min',
  },
  {
    img: manifestationPractice,
    title: 'Manifestation Practice',
    desc: '35 min',
  },
  {
    img: bodyScanRelaxation,
    title: 'Body Scan Relaxation',
    desc: '20 min',
  },
  {
    img: gratitudeMeditation,
    title: 'Gratitude Meditation',
    desc: '15 min',
  },
  {
    img: energyClearingVideo,
    title: 'Energy Clearing',
    desc: '30 min',
  },
];

const audioGuides = [
  {
    img: chakraBalancingAudio,
    title: 'Chakra Balancing Audio',
    desc: '45 min',
  },
  {
    img: manifestationAffirmations,
    title: 'Manifestation Affirmations',
    desc: '30 min',
  },
  {
    img: healingFrequencyTones,
    title: 'Healing Frequency Tones',
    desc: '60 min',
  },
  {
    img: guidedVisualization,
    title: 'Guided Visualization',
    desc: '25 min',
  },
  {
    img: sleepSoundscapes,
    title: 'Sleep Soundscapes',
    desc: '90 min',
  },
  {
    img: meditationMusic,
    title: 'Meditation Music',
    desc: '45 min',
  },
  {
    img: natureSounds,
    title: 'Nature Sounds',
    desc: '60 min',
  },
  {
    img: binauralBeats,
    title: 'Binaural Beats',
    desc: '30 min',
  },
  {
    img: sacredMantras,
    title: 'Sacred Mantras',
    desc: '45 min',
  },
];

export const VideoGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("Meditation Videos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const gridRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, []);

  // Filter videos by category
  const filteredVideos = selectedCategory === "Meditation Videos" ? meditationVideos : audioGuides;

  // Calculate pagination
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVideos = filteredVideos.slice(startIndex, endIndex);

  const scrollToGrid = () => {
    if (gridRef.current) {
      const headerOffset = 100;
      const elementPosition = gridRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTimeout(scrollToGrid, 100);
  };

  return (
    <section 
      className={`px-6 md:px-20 py-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
      ref={gridRef}
    >
      <div className="mb-8 animate-fade-in-up">
        <CategoryNavigation
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          filteredCategories={["Meditation Videos", "Audio Guides"]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentVideos.map((video, index) => (
          <div
            key={index}
            className="transition-all duration-500 ease-in-out transform animate-fade-in-up"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <VideosCard {...video} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="animate-fade-in-up animation-delay-500">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};
  