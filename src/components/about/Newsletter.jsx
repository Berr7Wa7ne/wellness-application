import React from 'react'
import rightArrow from '../../assets/right-arrow.png';

export const Newsletter = () => {
  return (
    <div>
    <section className="bg-[#899F87] py-10 px-10 flex justify-center space-x-10">
    <div className='flex justify-between items-center space-x-16'>
        <h3 className="text-[45px] text-[#F2F6EF] font-medium mb-4">Subscribe to get 10% off your first <br />order</h3>
        <form className="flex flex-col sm:flex-row justify-center gap-7 bg-white w-[444px] h-[76px]">
          <input
            type="email"
            placeholder="Drop your email here"
            className="px-4 py-2 rounded w-full"
          />
          <button className="px-[25px] py-[26px] hover:bg-[#899F87] transition">
                  <img
                    src={rightArrow}
                    alt="Right Arrow"
                    className=""
                  />
          </button>
        </form>
        </div>
      </section>
    </div>
  )
}
