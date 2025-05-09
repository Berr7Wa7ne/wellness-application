import React from 'react'

export const ServiceCard = ({ img, title, desc }) => {
    return (
    <div className="bg-white overflow-hidden">
    <div className="w-full h-[220px] overflow-hidden">
        <img
        src={img}
        alt={title}
        className="w-full h-full object-cover"
        />
    </div>
    <div className="p-4 font-serif">
        <h3 className="font-semibold text-[22px] mb-2">{title}</h3>
        <p className="text-[22px] text-[#4D664A]">{desc}</p>
    </div>
    </div>
    );
  }
