import React from 'react'
import { ServiceCard } from './ServiceCard';

// Sample image imports (replace with actual)
import image1 from '../../../assets/service1.png';
import image2 from '../../../assets/service2.png';
import image3 from '../../../assets/service3.png';
import image4 from '../../../assets/service4.png';
import image5 from '../../../assets/service5.png';

const services = [
  {
    img: image1,
    title: 'Energy Clearing & Chakra Balancing',
    desc: 'A guided energy healing session to cleanse your aura, unblock stagnant energy, and realign your chakra system for clarity and calm.',
  },
  {
    img: image2,
    title: 'Sacred Intention Rituals',
    desc: 'Custom rituals using candles, herbs, and sacred symbols to help you manifest, release, or protect. Perfect for moon phases, new beginnings, or spiritual transitions.',
  },
  {
    img: image3,
    title: 'Intuitive Card Reading',
    desc: 'A personalized oracle or tarot card reading offering clarity and spiritual insight for your current path or specific questions.',
  },
  {
    img: image4,
    title: 'Guided Meditation for Healing',
    desc: 'A voice-guided spiritual meditation session focused on inner peace, ancestral connection, or emotional release.',
  },
  {
    img: image5,
    title: 'Spiritual Coaching',
    desc: 'A private coaching session to help you navigate transitions, build spiritual habits, and reconnect with your higher self.',
  },
];

export const ServicesGrid = () => {
    const topRow = services.slice(0, 2);  // First 2 items
    const bottomRow = services.slice(2);  // Remaining items
  
    return (
      <section className="px-6 md:px-20 py-16 space-y-12">
        {/* Top Row - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topRow.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
  
        {/* Bottom Row - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bottomRow.map((service, index) => (
            <ServiceCard key={index + 2} {...service} />
          ))}
        </div>
      </section>
    );
  };
  