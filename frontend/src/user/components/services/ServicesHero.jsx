// src/components/services/ServicesHero.jsx
import React, { useEffect, useState } from 'react';
import heroPic4 from "../../../assets/hero-pic4.jpg"
import { ChevronDown } from 'lucide-react';

export const ServicesHero = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[80vh] md:h-screen w-full text-white overflow-hidden">
      {/* Background Image with Parallax */}
      <img
        src={heroPic4}
        alt="Services hero background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* Inject Navbar or any other absolute top elements */}
      {children}

      {/* Hero Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-6 md:px-12">
        <div className="flex items-center gap-3 mb-4 font-mono">
          {/* Animated Horizontal line with dot */}
          <div className="relative w-32 h-px bg-white overflow-hidden">
            <div className="absolute inset-0 bg-white animate-line-grow" />
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-dot-pulse" />
          </div>

          {/* Text next to the line */}
          <p className="uppercase tracking-widest text-[28px] text-white animate-fade-in">
            Our Sacred Services
          </p>
        </div>
        <h1 className="text-4xl md:text-[56px] font-light leading-tight max-w-4xl animate-fade-in-up">
          We offer guided spiritual services to support your personal growth, energy alignment, and emotional healing.
        </h1>
        
        {/* CTA Button */}
        <button className="mt-8 px-8 py-3 bg-white text-[#4D664A] hover:bg-[#4D664A] hover:text-white transition-all duration-300 transform hover:scale-105">
          Explore Our Services
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
};
