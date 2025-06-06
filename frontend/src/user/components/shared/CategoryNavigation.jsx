import React from 'react';
import { AudioLines, BookOpenCheck, Video, FlaskConical, ShieldCheck, HeartHandshake } from 'lucide-react';

const categoryColors = {
    'Magickal Oils': "bg-purple-100 text-purple-800",
    'Meditation Videos': "bg-green-100 text-green-600",
    'Licenses': "bg-rose-100 text-rose-600",
    'Audio Guides': "bg-orange-100 text-orange-600",
    'Healing Tools': "bg-blue-100 text-blue-600",
    'Books & Journals': "bg-cyan-100 text-cyan-600",
};

const categories = [
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

const CategoryNavigation = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div className="px-8 md:px-16 lg:px-24 xl:px-32 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => onCategorySelect(cat.category)}
            className={`bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center transition-all duration-300 ${
              selectedCategory === cat.category 
                ? 'shadow-md border-[#617C5F]' 
                : 'hover:shadow-md'
            }`}
          >
            <div className={`flex items-center justify-center h-10 w-10 rounded-lg p-2 ${
              selectedCategory === cat.category 
                ? categoryColors[cat.category].split(' ')[0] 
                : 'bg-gray-100'
            }`}>
              {cat.icon}
            </div>
            <span className={`mt-2 px-2 py-0.5 text-sm font-medium rounded ${
              categoryColors[cat.category] || "bg-gray-100 text-gray-600"
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