import React from 'react'
import mission from '../../../assets/mission.png';
import vision from '../../../assets/vision.png';

export const MissionVision = () => {
  return (
    <div>
    <section className="mission-vision md:py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          <div>
            <img
            src={mission} // Replace with your actual image path
            alt="mission"
            className="w-7 md:w-[48px]"
            />
            <h3 className="md:text-[40px] text-[20px] text-[#213721] font-semibold mb-2"> Our mission</h3>
            <p className='text-[#3C5E39] md:text-[20px] text-[15px] leading-tight font-serif'>
              To empower individuals through sacred tools, spiritual education,<br />
              and healing rituals — supporting the journey of personal growth, <br />
              energetic balance, and inner transformation.<br />
            </p>
          </div>
          <div>
          <img
            src={vision} // Replace with your actual image path
            alt="vision"
            className="w-7 md:w-[48px]"
            />
            <h3 className="md:text-[40px] text-[20px] text-[#213721] font-semibold mb-2">Our vision</h3>
            <p className='text-[#3C5E39] md:text-[20px] text-[15px] leading-tight font-serif'>
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
