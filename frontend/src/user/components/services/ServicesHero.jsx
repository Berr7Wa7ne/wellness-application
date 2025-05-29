// src/components/services/ServicesHero.jsx
import React from 'react';
import heroPic4 from "../../../assets/hero-pic4.jpg"

export const ServicesHero = ({ children }) => {
  return (
    <section className="relative h-[80vh] md:h-screen w-full text-white">
      {/* Background Image */}
      <img
        src={heroPic4}
        alt="Services hero background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* Inject Navbar or any other absolute top elements */}
      {children}

      {/* Hero Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-6 md:px-12">
      <div className="flex items-center gap-3 mb-4 font-mono">
        {/* Horizontal line with dot at the end */}
        <div className="relative w-32 h-px bg-white">
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
        </div>

        {/* Text next to the line */}
        <p className="uppercase tracking-widest text-[28px] text-white">
            Our Sacred Services
        </p>
        </div>
        <h1 className="text-4xl md:text-[56px] font-light leading-tight max-w-4xl">
          We offer guided spiritual services to support your personal growth, energy alignment, and emotional healing.
        </h1>
      </div>
    </section>
  );
};
