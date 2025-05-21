import React from 'react';
import heroPic from "../../../assets/hero-pic.png"
import { Link } from "react-router-dom";

export const HeroSection = ({ children }) => {
  return (
    <section className="hero-section relative h-[80vh] md:h-screen w-full">
      {/* Background Image */}
      <img
        src={heroPic}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* Inject Navbar (or other children) */}
      {children}

      {/* Hero Text */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-lg md:text-[108px] leading-tight">
          Get to know us better,<br /> about our brand
        </h1>
        <p className="mt-4 max-w-xl text-sm md:text-[20px] text-[#C7D1C6] font-mono">
          We’re here to inspire a mindful journey through ancient knowledge, rituals,
          and healing. Learn how our brand can help you reconnect with your own clarity,
          purpose, and inner peace.
        </p>
        {/* <button className="mt-6 px-[40px] py-[20px] bg-[#F2F6EF] text-[#213721] font-semibold hover:bg-gray-200 md:text-[22px] font-mono">
          Shop now →
        </button> */}
        <Link
            to="/merchandise"
            className="mt-6 px-[40px] py-[20px] bg-[#F2F6EF] text-[#213721] font-semibold hover:bg-gray-200 md:text-[22px] font-mono">
            Shop now <span className='w-5'>→</span>
        </Link>
      </div>
    </section>
  );
};

