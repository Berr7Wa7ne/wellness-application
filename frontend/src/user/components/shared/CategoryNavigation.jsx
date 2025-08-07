import React, { useState, useEffect } from 'react';
import { AudioLines, BookOpenCheck, Video, FlaskConical, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useCategories } from '../../../context/user/category/CategoryContext'; // Adjust path as needed

const CategoryNavigation = ({ 
  selectedCategory, 
  onCategorySelect, 
  pageType = 'merchandise', // 'merchandise' or 'videos'
  availableCategories = null 
}) => {
  const [isActive, setIsActive] = useState(false);
  const { categories, loading, error } = useCategories();

  useEffect(() => {
    setIsActive(true);
  }, []);

  // Icon mapping for categories
  const categoryIcons = {
    'Magickal Oils': <FlaskConical className="w-5 h-5" />,
    'Meditation Videos': <Video className="w-5 h-5" />,
    'Licenses': <ShieldCheck className="w-5 h-5" />,
    'Audio Guides': <AudioLines className="w-5 h-5" />,
    'Healing Tools': <HeartHandshake className="w-5 h-5" />,
    'Books & Journals': <BookOpenCheck className="w-5 h-5" />
  };

  // Page type mapping
  const pageTypeMapping = {
    'Magickal Oils': ['merchandise'],
    'Meditation Videos': ['videos'],
    'Licenses': ['merchandise'],
    'Audio Guides': ['videos'],
    'Healing Tools': ['merchandise'],
    'Books & Journals': ['merchandise']
  };

  // Create category colors object from API data
  const getCategoryColors = () => {
    const colors = {};
    categories.forEach(cat => {
      colors[cat.name] = `${cat.backgroundColor} ${cat.textColor}`;
    });
    return colors;
  };

  const categoryColors = getCategoryColors();

  // Get category data from API
  const getCategoryFromAPI = (categoryName) => {
    return categories.find(cat => cat.name === categoryName);
  };

  // Filter categories based on page type and available categories
  const getDisplayCategories = () => {
    // Filter categories that exist in API and match page type
    let filtered = categories.filter(cat => {
      const pageTypes = pageTypeMapping[cat.name] || [];
      return pageTypes.includes(pageType);
    });

    // If availableCategories is provided, further filter by that
    if (availableCategories && availableCategories.length > 0) {
      filtered = filtered.filter(cat => 
        availableCategories.includes(cat.name)
      );
    }

    return filtered.map(cat => ({
      category: cat.name,
      icon: categoryIcons[cat.name] || <FlaskConical className="w-5 h-5" />,
      backgroundColor: cat.backgroundColor,
      textColor: cat.textColor,
      apiData: cat
    }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="px-8 md:px-16 lg:px-24 xl:px-32 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#617C5F]"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="px-8 md:px-16 lg:px-24 xl:px-32 py-8">
        <div className="text-center text-red-600">
          Error loading categories: {error}
        </div>
      </div>
    );
  }

  const displayCategories = getDisplayCategories();

  // Don't render if no categories to show
  if (displayCategories.length === 0) {
    return null;
  }

  // Determine grid layout based on number of categories (for larger screens)
  const getGridClass = () => {
    const count = displayCategories.length;
    if (count <= 2) return 'grid-cols-1 md:grid-cols-2';
    if (count <= 4) return 'grid-cols-2 md:grid-cols-4';
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
  };

  return (
    <div className={`px-8 md:px-16 lg:px-24 xl:px-32 py-4 md:py-8 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Mobile/Tablet View - Horizontal Scrollable */}
      <div className="md:hidden">
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {displayCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => onCategorySelect(cat.category)}
              className="flex-shrink-0 pb-2 text-sm font-medium whitespace-nowrap transition-all duration-300 relative"
            >
              <span 
                className="text-[#617C5F]"
              >
                {cat.category}
              </span>
              {selectedCategory === cat.category && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
                  style={{
                    backgroundColor: cat.textColor
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop View - Grid Layout (unchanged) */}
      <div className={`hidden md:grid ${getGridClass()} gap-4 justify-center`}>
        {displayCategories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => onCategorySelect(cat.category)}
            className={`border rounded-xl p-4 flex flex-col items-center text-center transition-all duration-300 min-w-[120px] ${
              selectedCategory === cat.category 
                ? 'bg-[#617C5F] text-white shadow-md' 
                : 'border-gray-200 hover:shadow-md'
            }`}
          >
            <div 
              className={`flex items-center justify-center h-10 w-10 rounded-lg ${
                selectedCategory === cat.category 
                  ? 'text-white' 
                  : ''
              }`}
              style={{
                backgroundColor: selectedCategory === cat.category 
                  ? 'transparent' 
                  : cat.backgroundColor,
                color: selectedCategory === cat.category 
                  ? 'white' 
                  : cat.textColor
              }}
            >
              {cat.icon}
            </div>
            <span 
              className={`mt-2 px-2 py-0.5 text-sm font-medium rounded ${
                selectedCategory === cat.category 
                  ? 'text-white' 
                  : ''
              }`}
              style={{
                backgroundColor: selectedCategory === cat.category 
                  ? 'transparent' 
                  : cat.backgroundColor,
                color: selectedCategory === cat.category 
                  ? 'white' 
                  : cat.textColor
              }}
            >
              {cat.category}
            </span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  );
};

export default CategoryNavigation;