import React from 'react'
import { ServiceCard } from './ServiceCard';

// Sample image imports (replace with actual)
import image1 from '../../../assets/service1.png';
import image2 from '../../../assets/service2.png';
import image3 from '../../../assets/service3.png';
import image4 from '../../../assets/service4.png';
import image5 from '../../../assets/service5.png';
import image6 from '../../../assets/service6.jpg';

const services = [
  {
    img: image1,
    title: 'Magickal Oils',
    desc: 'Discover our collection of handcrafted magickal oils, each infused with intention and natural ingredients to enhance your spiritual practice.',
  },
  {
    img: image2,
    title: 'Meditation Videos',
    desc: 'Immerse yourself in our guided meditation videos, designed to help you find peace, clarity, and spiritual connection.',
  },
  {
    img: image3,
    title: 'Licenses',
    desc: 'Access our premium content and exclusive spiritual resources with our flexible licensing options.',
  },
  {
    img: image4,
    title: 'Audio Guides',
    desc: 'Experience our collection of spiritual audio guides, perfect for your daily practice and personal growth journey.',
  },
  {
    img: image5,
    title: 'Healing Tools',
    desc: 'Explore our curated selection of healing tools and instruments to support your spiritual and physical wellbeing.',
  },
  {
    img: image6,
    title: 'Books & Journals',
    desc: 'Dive into our spiritual literature and guided journals to deepen your understanding and track your journey.',
  },
];

export const ServicesGrid = () => {
    const topRow = services.slice(0, 3);  // First 3 items
    const bottomRow = services.slice(3);  // Last 3 items
  
    return (
      <section className="px-6 md:px-20 py-16 space-y-12">
        {/* Top Row - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topRow.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
  
        {/* Bottom Row - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bottomRow.map((service, index) => (
            <ServiceCard key={index + 3} {...service} />
          ))}
        </div>
      </section>
    );
  };
  