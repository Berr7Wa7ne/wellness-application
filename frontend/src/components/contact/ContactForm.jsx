import React from 'react';

export const ContactForm = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-10 p-10 font-mono text-[16px]">
      {/* Left: Form */}
      <form className="flex-1 max-w-3xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block font-semibold">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="mt-1 block w-full border-b border-gray-300 focus:outline-none py-2 text-[#899F87]"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block font-semibold">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="mt-1 block w-full border-b border-gray-300 focus:outline-none py-2 text-[#899F87]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full border-b border-gray-300 focus:outline-none py-2 text-[#899F87]"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block font-semibold">Reason</label>
            <select className="mt-1 block w-full border-b border-gray-300 focus:outline-none py-2 text-[#899F87]">
              <option value="">Select your reason</option>
              <option value="general">General Inquiry</option>
              <option value="support">Customer Support</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>

          {/* Phone (Full width) */}
          <div className="md:col-span-2">
            <label className="block font-semibold">Phone</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="mt-1 block w-full border-b border-gray-300 focus:outline-none py-2 text-[#899F87]"
            />
          </div>

          {/* Message (Full width) */}
          <div className="md:col-span-2">
            <label className="block font-semibold">Message</label>
            <textarea
              placeholder="Enter your message"
              className="mt-1 block w-full border-b border-gray-300 focus:outline-none py-2 text-[#899F87]"
              rows={4}
            ></textarea>
          </div>
        </div>

        {/* Send Message Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-[#213721] text-white px-[33px] py-[10px] shadow hover:bg-green-800 font-semibold"
          >
            Send Message
          </button>
        </div>
      </form>

      {/* Right: Info Section */}
      <div className="w-full md:w-1/3 text-gray-800">
        <h2 className="text-[30px] font-semibold mb-2">Where to find us</h2>
        <div className='text-[#3C5E39]'>
        <p>soulscape@gmail.com</p>
        <p>soulscape-product@gmail.com</p>
        <p className="mt-2">
          Our response time is 24 hours for general inquiries and customer support-related matters.
        </p>
        </div>
      </div>
    </div>
  );
};
