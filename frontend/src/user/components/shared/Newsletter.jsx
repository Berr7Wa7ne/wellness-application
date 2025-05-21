import React from 'react'
import rightArrow from '../../../assets/right-arrow.png';

export const Newsletter = () => {
  return (
    <div>
    <section className="bg-[#899F87] py-10 px-10 flex justify-center space-x-10">
    <div className='md:flex justify-between items-center space-x-16'>
        <h3 className="md:text-[45px] text-[23px] text-[#F2F6EF] font-medium mb-4">Subscribe to get 10% off your first <br />order</h3>
        <form className="flex flex-row items-center bg-white md:w-[444px] md:h-[76px] rounded overflow-hidden">
          <input
            type="email"
            placeholder="Drop your email here"
            className="px-4 py-2 w-full outline-none text-sm"
          />
          <button className="px-4 py-2 hover:bg-[#899F87] transition">
            <img
              src={rightArrow}
              alt="Right Arrow"
              className="w-6 md:w-[48px]"
            />
          </button>
        </form>
        </div>
      </section>
    </div>
  )
}
