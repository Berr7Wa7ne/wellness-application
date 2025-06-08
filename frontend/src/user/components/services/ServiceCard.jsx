import React from 'react'

const categoryColors = {
  'Magickal Oils': "bg-[#FFE4E1] text-[#FF6B6B]",
  'Meditation Videos': "bg-[#E0F2F1] text-[#26A69A]",
  'Licenses': "bg-[#E8F5E9] text-[#66BB6A]",
  'Audio Guides': "bg-[#FFF3E0] text-[#FFA726]",
  'Healing Tools': "bg-[#E3F2FD] text-[#42A5F5]",
  'Books & Journals': "bg-[#F3E5F5] text-[#AB47BC]",
};

export const ServiceCard = ({ img, title, desc }) => {
    return (
      <div className="bg-white overflow-hidden group hover:shadow-xl transition-all duration-300">
        <div className="w-full h-[220px] overflow-hidden">
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
        </div>
        <div className="p-6 group-hover:bg-[#4D664A]/5 transition-colors duration-300">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${categoryColors[title]}`}>
              {title}
            </span>
            <p className="text-[18px] font-serif text-[#4D664A] group-hover:text-[#3A4D38] transition-colors duration-300 mb-4">{desc}</p>
            <button className="w-full bg-[#213721] text-white py-2 px-4 rounded-none hover:bg-green-800 transition-colors">
              Learn More
            </button>
        </div>
      </div>
    );
}
