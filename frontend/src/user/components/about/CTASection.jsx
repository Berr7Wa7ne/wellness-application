import React from 'react';
import ctaPic from "../../../assets/cta-pic.png";

export const CTASection = () => {
  return (
    <section className=" cta-section relative h-[80vh] md:h-screen w-full mb-16">
      {/* Background Image */}
      <img
        src={ctaPic}
        alt="CTA pic"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Centered Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="p-6 rounded max-w-2xl text-center">
          <h2 className="text-3xl md:text-[75px] text-[#F2F6EF] mb-4">
            Ready to Begin Your Healing Journey?
          </h2>
          <p className="mb-6 text-base md:text-[20px] text-[#fdfdf4] font-mono">
          Whether you're seeking clarity, connection, or transformation — your path starts here. Explore our offerings, book a service, or connect with us to receive guidance aligned with your so
          </p>
          <button className="mt-6 px-[40px] py-[20px] bg-[#F2F6EF] text-[#213721] rounded-md font-semibold hover:bg-gray-200 md:text-[22px] font-mono">
          Shop now →
        </button>
        </div>
      </div>
    </section>
  );
};
