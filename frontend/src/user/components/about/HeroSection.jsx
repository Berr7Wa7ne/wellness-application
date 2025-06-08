import React, { useEffect, useState } from 'react';
import heroPic from "../../../assets/hero-pic1.jpg"
import { Link } from "react-router-dom";

export const HeroSection = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[80vh] md:h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <img
        src={heroPic}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* Inject Navbar (or other children) */}
      {children}

      {/* Hero Text with Fade-in Animation */}
      <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-[#C7D1C6] px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h1 className="text-lg md:text-[108px] leading-tight mt-10">
          Get to know us better,<br /> about our brand
        </h1>
        <p className="mt-4 max-w-xl text-sm md:text-[20px] text-[#ffffff] font-mono">
          We're here to inspire a mindful journey through ancient knowledge, rituals,
          and healing. Learn how our brand can help you reconnect with your own clarity,
          purpose, and inner peace.
        </p>
        <Link
          to="/merchandise"
          className="mt-6 px-[40px] py-[20px] rounded-md bg-[#F2F6EF] text-[#213721] font-semibold hover:bg-gray-200 md:text-[22px] font-mono transition-all duration-300 hover:scale-[1.02]"
        >
          Shop now <span className='w-5'>→</span>
        </Link>
      </div>
    </section>
  );
};

