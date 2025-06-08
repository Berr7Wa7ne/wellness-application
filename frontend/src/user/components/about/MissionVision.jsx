import React, { useEffect, useRef } from 'react'
import mission from '../../../assets/mission.png';
import vision from '../../../assets/vision.png';

export const MissionVision = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <section className="mission-vision md:py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          <div className="animate-on-scroll">
            <img
              src={mission}
              alt="mission"
              className="w-7 md:w-[48px] hover:scale-110 transition-transform duration-300"
            />
            <h3 className="md:text-[40px] text-[20px] text-[#213721] font-semibold mb-2 animate-on-scroll animation-delay-200">
              Our mission
            </h3>
            <p className='text-[#3C5E39] md:text-[20px] text-[15px] leading-tight font-serif animate-on-scroll animation-delay-300'>
              To empower individuals through sacred tools, spiritual education,<br />
              and healing rituals — supporting the journey of personal growth, <br />
              energetic balance, and inner transformation.<br />
            </p>
          </div>
          <div className="animate-on-scroll animation-delay-200">
            <img
              src={vision}
              alt="vision"
              className="w-7 md:w-[48px] hover:scale-110 transition-transform duration-300"
            />
            <h3 className="md:text-[40px] text-[20px] text-[#213721] font-semibold mb-2 animate-on-scroll animation-delay-400">
              Our vision
            </h3>
            <p className='text-[#3C5E39] md:text-[20px] text-[15px] leading-tight font-serif animate-on-scroll animation-delay-500'>
              To be a trusted spiritual guide and global wellness portal —<br />
              inspiring deeper self-connection, community, and purposeful living<br />
              through elevated metaphysical spaces & tools.<br />
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
