import React from 'react'
import { MoreHorizontal, AudioLines, BookOpenCheck, Video, FlaskConical, ShieldCheck, HeartHandshake } from 'lucide-react'

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
    type: 'Products',
    description: 'Essential oils for spiritual and wellness practices',
    items: 15,
    color: 'bg-gray-100 text-[#213721]',
    icon: <FlaskConical className="w-5 h-5" />
  },
  {
    category: 'Meditation Videos',
    type: 'Videos',
    description: 'Guided meditation and mindfulness content',
    items: 8,
    color: 'bg-gray-100 text-[#213721]',
    icon: <Video className="w-5 h-5" />
  },
  {
    category: 'Licenses',
    type: 'Products',
    description: 'Digital licenses and certifications',
    items: 5,
    color: 'bg-gray-100 text-[#213721]',
    icon: <ShieldCheck className="w-5 h-5" />
  },
  {
    category: 'Audio Guides',
    type: 'Audio',
    description: 'Spoken word guidance and affirmations',
    items: 12,
    color: 'bg-gray-100 text-[#213721]',
    icon: <AudioLines className="w-5 h-5" />
  },
  {
    category: 'Healing Tools',
    type: 'Products',
    description: 'Physical tools for healing practices',
    items: 7,
    color: 'bg-gray-100 text-[#213721]',
    icon: <HeartHandshake className="w-5 h-5" />
  },
  {
    category: 'Books & Journals',
    type: 'Products',
    description: 'Written materials and guided journals',
    items: 9,
    color: 'bg-gray-100 text-[#213721]',
    icon: <BookOpenCheck className="w-5 h-5" />
  }
]

const ManageCategoriesCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-6">
      {categories.map((cat, idx) => (
        <div
          key={idx}
          className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between min-h-[140px]"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center h-10 w-10 rounded-lg p-2 ${cat.color}`}>
                {cat.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  <span className={`px-2 py-0.5 text-base font-medium rounded ${categoryColors[cat.category] || "bg-gray-100 text-gray-600"}`}>
                      {cat.category}
                  </span>
                </h3>
                <p className="text-xs text-gray-400">{cat.type}</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {cat.description}
          </div>
          <div className="flex justify-between items-end mt-4">
            <div className="text-xs text-gray-400">Items</div>
            <div className={`text-sm font-semibold ${cat.color.replace('bg','text').replace('100','500').replace('600','500')}`}>{cat.items}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ManageCategoriesCards
