import React from 'react'

export const ContactHero = ({ children }) => {
    return (
        <section className="relative h-[80vh] md:h-screen w-full bg-[#899F87] text-white">
          {/* Overlay (optional): tint or gradient */}
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
                Contact Us
            </p>
            </div>
            <h1 className="text-4xl md:text-[56px] font-light leading-tight max-w-4xl">
            Need Help? <br />Please Reach out
            </h1>
          </div>
        </section>
      );
}
