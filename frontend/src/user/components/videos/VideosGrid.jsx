import React, { useState } from 'react';
import { VideosCard } from './VideosCard';
import CategoryNavigation from '../shared/CategoryNavigation';

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

  const currentVideos = selectedCategory === "Meditation Videos" ? meditationVideos : audioGuides;

  return (
    <section className="px-6 md:px-20 py-16">
      <div className="mb-8">
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
            className="transition-all duration-500 ease-in-out transform"
            style={{
              opacity: 1,
              transform: 'translateY(0)',
            }}
          >
            <VideosCard {...video} />
          </div>
        ))}
      </div>
    </section>
  );
};
  