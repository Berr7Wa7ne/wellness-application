import React, { useState, useEffect } from 'react';
import { AudioLines, BookOpenCheck, Video, FlaskConical, ShieldCheck, HeartHandshake } from 'lucide-react';

const categoryColors = {
    'Magickal Oils': "bg-[#FFE4E1] text-[#FF6B6B]",
    'Meditation Videos': "bg-[#E0F2F1] text-[#26A69A]",
    'Licenses': "bg-[#E8F5E9] text-[#66BB6A]",
    'Audio Guides': "bg-[#FFF3E0] text-[#FFA726]",
    'Healing Tools': "bg-[#E3F2FD] text-[#42A5F5]",
    'Books & Journals': "bg-[#F3E5F5] text-[#AB47BC]",
};

const CategoryNavigation = ({ selectedCategory, onCategorySelect, filteredCategories = null }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(true);
  }, []);

  const allCategories = [
    {
      category: 'Magickal Oils',
      icon: <FlaskConical className="w-5 h-5" />
    },
    {
      category: 'Meditation Videos',
      icon: <Video className="w-5 h-5" />
    },
    {
      category: 'Licenses',
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      category: 'Audio Guides',
      icon: <AudioLines className="w-5 h-5" />
    },
    {
      category: 'Healing Tools',
      icon: <HeartHandshake className="w-5 h-5" />
    },
    {
      category: 'Books & Journals',
      icon: <BookOpenCheck className="w-5 h-5" />
    }
  ];

  const displayCategories = filteredCategories 
    ? allCategories.filter(cat => filteredCategories.includes(cat.category))
    : allCategories;

  return (
    <div className={`px-8 md:px-16 lg:px-24 xl:px-32 py-8 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {displayCategories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => onCategorySelect(cat.category)}
            className={`border rounded-xl p-4 flex flex-col items-center text-center transition-all duration-300 ${
              selectedCategory === cat.category 
                ? 'bg-[#617C5F] text-white shadow-md' 
                : 'border-gray-200 hover:shadow-md'
            }`}
          >
            <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${
              selectedCategory === cat.category 
                ? 'text-white' 
                : categoryColors[cat.category].split(' ')[0]
            }`}>
              {cat.icon}
            </div>
            <span className={`mt-2 px-2 py-0.5 text-sm font-medium rounded ${
              selectedCategory === cat.category 
                ? 'text-white' 
                : categoryColors[cat.category] || "bg-gray-100 text-gray-600"
            }`}>
              {cat.category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNavigation; 