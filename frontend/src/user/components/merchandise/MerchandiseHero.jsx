import React, { useEffect, useState } from 'react'
import heroPic3 from "../../../assets/hero-pic3.jpg"
import { ChevronDown } from 'lucide-react';

export const MerchandiseHero = ({ children }) => {
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
        <section className="relative h-[80vh] md:h-screen w-full text-white overflow-hidden">
            {/* Background Image with Parallax */}
            <img
                src={heroPic3}
                alt="Merchandise hero background"
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
            <div className={`absolute inset-0 z-20 flex flex-col justify-center items-start px-6 md:px-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex items-center gap-3 mb-4 font-mono animate-fade-in-up">
                    {/* Horizontal line with dot at the end */}
                    <div className="relative w-32 h-px bg-white">
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
        
                    {/* Text next to the line */}
                    <p className="uppercase tracking-widest text-[28px] text-white">
                        Merchandise
                    </p>
                </div>
                <h1 className="text-4xl md:text-[56px] font-light leading-tight max-w-4xl animate-fade-in-up animation-delay-200">
                    Spiritual Tools & Offerings
                </h1>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                <ChevronDown className="w-8 h-8 text-white" />
            </div>
        </section>
    );
};
