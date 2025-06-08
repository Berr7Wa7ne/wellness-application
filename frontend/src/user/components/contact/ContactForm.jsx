import React, { useEffect, useRef } from 'react';

export const ContactForm = () => {
  const formRef = useRef(null);

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

    const elements = formRef.current.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div ref={formRef} className="flex flex-col md:flex-row justify-between items-start gap-10 p-10 font-mono text-[16px]">
      {/* Left: Form */}
      <form className="flex-1 max-w-3xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="animate-on-scroll">
            <label className="block font-semibold">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="mt-1 block w-full border-b border-gray-300 focus:outline-none py-2 text-[#899F87] transition-colors duration-300 focus:border-[#617C5F]"
            />
          </div>

          {/* Last Name */}
          <div className="animate-on-scroll animation-delay-100">
            <label className="block font-semibold">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="mt-1 block w-full border-b border-gray-300 focus:outline-none py-2 text-[#899F87] transition-colors duration-300 focus:border-[#617C5F]"
            />
          </div>

          {/* Email */}
          <div className="animate-on-scroll animation-delay-200">
            <label className="block font-semibold">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full border-b border-gray-300 focus:outline-none py-2 text-[#899F87] transition-colors duration-300 focus:border-[#617C5F]"
            />
          </div>

          {/* Reason */}
          <div className="animate-on-scroll animation-delay-300">
            <label className="block font-semibold">Reason</label>
            <select className="mt-1 block w-full border-b border-gray-300 focus:outline-none py-2 text-[#899F87] transition-colors duration-300 focus:border-[#617C5F]">
              <option value="">Select your reason</option>
              <option value="general">General Inquiry</option>
              <option value="support">Customer Support</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>

          {/* Phone (Full width) */}
          <div className="md:col-span-2 animate-on-scroll animation-delay-400">
            <label className="block font-semibold">Phone</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="mt-1 block w-full border-b border-gray-300 focus:outline-none py-2 text-[#899F87] transition-colors duration-300 focus:border-[#617C5F]"
            />
          </div>

          {/* Message (Full width) */}
          <div className="md:col-span-2 animate-on-scroll animation-delay-500">
            <label className="block font-semibold">Message</label>
            <textarea
              placeholder="Enter your message"
              className="mt-1 block w-full border-b border-gray-300 focus:outline-none py-2 text-[#899F87] transition-colors duration-300 focus:border-[#617C5F]"
              rows={4}
            ></textarea>
          </div>
        </div>

        {/* Send Message Button */}
        <div className="mt-6 animate-on-scroll animation-delay-600">
          <button
            type="submit"
            className="bg-[#213721] text-white px-[33px] py-[10px] shadow hover:bg-green-800 font-semibold transition-all duration-300 transform hover:scale-[1.02]"
          >
            Send Message
          </button>
        </div>
      </form>

      {/* Right: Info Section */}
      <div className="w-full md:w-1/3 text-gray-800 animate-on-scroll animation-delay-700">
        <h2 className="text-[30px] font-semibold mb-2">Where to find us</h2>
        <div className='text-[#3C5E39]'>
          <p className="transition-colors duration-300 hover:text-[#213721]">soulscape@gmail.com</p>
          <p className="transition-colors duration-300 hover:text-[#213721]">soulscape-product@gmail.com</p>
          <p className="mt-2">
            Our response time is 24 hours for general inquiries and customer support-related matters.
          </p>
        </div>
      </div>
    </div>
  );
};
