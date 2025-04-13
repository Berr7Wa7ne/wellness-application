import React from 'react'
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import twitter from '../../assets/twitter.png';

export const Footer = () => {
  return (
    <div>
      <footer className="bg-[#F2F6EF]  px-4 border-t">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        <div className='text-center border-r-2 border-[#C8D8C0] px-4 py-12'>
          <h4 className="font-semibold mb-14 text-[22px]">SoulScape</h4>
          <p className='text-[20px] text-[#617C5F]'>
            Opening Hours:<br />
            <span className='font-semibold'>
              Monday to Saturday: <br />10:30 a.m. to 7 p.m.
            </span>
          </p>
          {/* Social Media Icons */}
          <div className="flex justify-center gap-4 mt-20">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebook} alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagram} alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="Twitter" className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className='text-center border-r-2 border-[#C8D8C0] px-4 py-12'>
            <h4 className="font-semibold mb-2 text-[28px] text-[#617C5F]">Quick Links</h4>
            <ul className="space-y-1 text-[22px] text-[#101C10]">
              <li className='mb-2'>Home</li>
              <li className='mb-2'>About</li>
              <li className='mb-2'>Services</li>
              <li className='mb-2'>Videos</li>
              <li className='mb-2'>Merchandise</li>
              <li className='mb-2'>Contact</li>
            </ul>
          </div>
          <div className='text-center border-r-2 border-[#C8D8C0] px-4 py-12'>
            <h4 className="font-semibold mb-2 text-[28px] text-[#617C5F]">Social Media</h4>
            <ul className="space-y-1 text-[22px] text-[#101C10]">
              <li className='mb-2'>Twitter</li>
              <li className='mb-2'>Facebook</li>
              <li className='mb-2'>Instagram</li>
              <li className='mb-2'>TikTok</li>
              <li className='mb-2'>WhatsApp</li>
            </ul>
          </div>
          <div className='text-center px-4 py-12'>
            <h4 className="font-semibold mb-2 text-[28px] text-[#617C5F]">Contact Information</h4>
            <p className='text-[22px] text-[#101C10] mb-2'>support@yourplatform.com</p>
            <p className='text-[22px] text-[#101C10]'>+123 456 7890</p>
          </div>
        </div>
      </footer>
      <p className='text-[18px] text-[#617C5F] ml-16 my-7'>© soulscape2025</p>
    </div>
  )
}
