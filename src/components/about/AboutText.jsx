import React from 'react'
import goddess from '../../assets/goddess.png';

export const AboutText = () => {
  return (
    <div>
    <section className="py-16 px-4 text-left">
        <h2 className="text-[28px] font-semibold mb-4 text-[#617C5F]">About Us</h2>
        <p className="text-[56px] mb-8 text-[#213721]">
          We are a sanctuary for seekers, <br />healers, and those ready to <br />reclaim their inner light.
        </p>
        <div className='flex justify-between items-center'>
        <div>
        <p className="text-[#3C5E39] text-[20px] mb-4">
        Our offerings are rooted in ancient wisdom and modern soul work — from <br />guided rituals and healing oils to sacred mentorship and spiritual <br />education.
        </p>
        <p className='text-[#3C5E39] text-[40px]'>
        Our space blends intentional design, <br />personalized guidance, and <br />metaphysical tools to help you align, <br />awaken, and evolve.
        <br />Whether you’re stepping into the <br />spiritual path or deepening your <br />practice, we provide what your soul <br />needs to reconnect and rise.
        </p>
        </div>

        <div className="mt-10">
          <img
            src={goddess}
            alt="goddess"
            className="w-[800px] h-[539px]"
          />
        </div>
        </div>
      </section>
    </div>
  )
}
