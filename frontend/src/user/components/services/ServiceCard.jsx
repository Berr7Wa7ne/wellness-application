import React from 'react'

export const ServiceCard = ({ img, title, desc, backgroundColor, textColor }) => {
    // Create dynamic style for the category badge
    const badgeStyle = {
        backgroundColor: backgroundColor || '#E8F5E9',
        color: textColor || '#66BB6A'
    };

    return (
      <div className="bg-white overflow-hidden group hover:shadow-xl transition-all duration-300">
        <div className="w-full h-[220px] overflow-hidden">
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                // Fallback to a default image if the category image fails to load
                e.target.src = '/default-category-image.jpg';
              }}
            />
        </div>
        <div className="py-6 group-hover:bg-[#4D664A]/5 transition-colors duration-300">
            <span 
              className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-3"
              style={badgeStyle}
            >
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
