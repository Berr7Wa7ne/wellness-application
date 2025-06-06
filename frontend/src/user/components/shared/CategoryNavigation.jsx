import React from 'react';
import { Link } from 'react-router-dom';
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
    path: '/merchandise/magickal-oils',
    icon: <FlaskConical className="w-5 h-5" />
  },
  {
    category: 'Meditation Videos',
    path: '/videos/meditation',
    icon: <Video className="w-5 h-5" />
  },
  {
    category: 'Licenses',
    path: '/merchandise/licenses',
    icon: <ShieldCheck className="w-5 h-5" />
  },
  {
    category: 'Audio Guides',
    path: '/videos/audio-guides',
    icon: <AudioLines className="w-5 h-5" />
  },
  {
    category: 'Healing Tools',
    path: '/merchandise/healing-tools',
    icon: <HeartHandshake className="w-5 h-5" />
  },
  {
    category: 'Books & Journals',
    path: '/merchandise/books-journals',
    icon: <BookOpenCheck className="w-5 h-5" />
  }
];

const CategoryNavigation = () => {
  return (
    <div className="px-8 md:px-16 lg:px-24 xl:px-32 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            to={cat.path}
            className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300"
          >
            <div className={`flex items-center justify-center h-10 w-10 rounded-lg p-2 ${cat.category === 'Magickal Oils' ? 'bg-purple-100' : 'bg-gray-100'}`}>
              {cat.icon}
            </div>
            <span className={`mt-2 px-2 py-0.5 text-sm font-medium rounded ${categoryColors[cat.category] || "bg-gray-100 text-gray-600"}`}>
              {cat.category}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryNavigation; 