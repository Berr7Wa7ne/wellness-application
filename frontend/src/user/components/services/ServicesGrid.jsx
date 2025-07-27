import React from 'react'
import { ServiceCard } from './ServiceCard';
import { useCategories } from '../../../context/user/category/CategoryContext';

export const ServicesGrid = () => {
    const { categories, loading, error } = useCategories();

    if (loading) {
        return (
            <section className="px-6 md:px-20 py-16">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#213721] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading categories...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="px-6 md:px-20 py-16">
                <div className="text-center">
                    <p className="text-red-600">Error loading categories: {error}</p>
                </div>
            </section>
        );
    }

    if (!categories || categories.length === 0) {
        return (
            <section className="px-6 md:px-20 py-16">
                <div className="text-center">
                    <p className="text-gray-600">No categories available.</p>
                </div>
            </section>
        );
    }

    const topRow = categories.slice(0, 3);  // First 3 items
    const bottomRow = categories.slice(3);  // Last 3 items
  
    return (
      <section className="px-6 md:px-20 py-16 space-y-12">
        {/* Top Row - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topRow.map((category, index) => (
            <ServiceCard 
              key={category._id || index} 
              img={category.imageUrl || '/default-category-image.jpg'} // Fallback image
              title={category.name}
              desc={category.description}
              backgroundColor={category.backgroundColor}
              textColor={category.textColor}
            />
          ))}
        </div>
  
        {/* Bottom Row - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bottomRow.map((category, index) => (
            <ServiceCard 
              key={category._id || index + 3} 
              img={category.imageUrl || '/default-category-image.jpg'} // Fallback image
              title={category.name}
              desc={category.description}
              backgroundColor={category.backgroundColor}
              textColor={category.textColor}
            />
          ))}
        </div>
      </section>
    );
  };
  