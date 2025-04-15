import React from 'react'
import goddess from '../../assets/goddess.png';

export const AboutText = () => {
  return (
    <div>
    <section className="md:py-16 py-8 px-4 text-left">
        <h2 className="md:text-[28px] text-[16px] font-semibold mb-4 text-[#617C5F]">About Us</h2>
        <p className="md:text-[56px] text-[27px] mb-8 text-[#213721]">
          We are a sanctuary for seekers, <br />healers, and those ready to <br />reclaim their inner light.
        </p>
        <div className='flex flex-col-reverse md:flex-row justify-between items-center'>
        {/* Text Section */}
        <div className='mt-6 md:mt-0'>
          <p className="text-[#3C5E39] md:text-[20px] text-[15px] mb-4">
            Our offerings are rooted in ancient wisdom and modern soul work — from <br />
            guided rituals and healing oils to sacred mentorship and spiritual <br />
            education.
          </p>
          <p className='text-[#3C5E39] md:text-[40px] text-[20px]'>
            Our space blends intentional design, <br />
            personalized guidance, and <br />
            metaphysical tools to help you align, <br />
            awaken, and evolve.
            <br />Whether you’re stepping into the <br />
            spiritual path or deepening your <br />
            practice, we provide what your soul <br />
            needs to reconnect and rise.
          </p>
        </div>

        {/* Image Section */}
        <div className="md:mt-10">
          <img
            src={goddess}
            alt="goddess"
            className="md:w-[800px] md:h-[539px] w-full h-auto"
          />
      </div>
      </div>
      </section>
    </div>
  )
}
