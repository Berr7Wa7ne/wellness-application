import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const categoryColors = {
  'Magickal Oils': "bg-[#FFE4E1] text-[#FF6B6B]",
  'Meditation Videos': "bg-[#E0F2F1] text-[#26A69A]",
  'Licenses': "bg-[#E8F5E9] text-[#66BB6A]",
  'Audio Guides': "bg-[#FFF3E0] text-[#FFA726]",
  'Healing Tools': "bg-[#E3F2FD] text-[#42A5F5]",
  'Books & Journals': "bg-[#F3E5F5] text-[#AB47BC]",
};

export const RelatedProductsSection = ({ relatedProducts }) => {
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    if (relatedProducts.length === 0) return;

    // Function to get completely new random products
    const getNewProducts = () => {
      // Create a copy of all products
      const availableProducts = [...relatedProducts];
      const selectedProducts = [];

      // Select 3 random products
      for (let i = 0; i < 3 && availableProducts.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableProducts.length);
        selectedProducts.push(availableProducts[randomIndex]);
        // Remove the selected product from available products
        availableProducts.splice(randomIndex, 1);
      }

      return selectedProducts;
    };

    // Initial set of products
    setDisplayedProducts(getNewProducts());

    // Set up interval to change products
    const interval = setInterval(() => {
      setDisplayedProducts(getNewProducts());
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [relatedProducts]);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-8 mb-8 lg:px-24 xl:px-32">
      <h2 className="text-3xl font-bold text-[#213721] mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProducts.map((relProduct, index) => (
          <Link 
            to={`/product-preview/${relProduct.name.replace(/\s/g, '-')}`}
            key={`${relProduct.name}-${Date.now()}`}
            className="border-2 border-[#C8D8C0] rounded-lg bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col group cursor-pointer"
          >
            <div className="relative w-full pt-[50%]">
              <div className="absolute inset-0">
                <img
                  src={relProduct.image}
                  alt={relProduct.name}
                  className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${categoryColors[relProduct.category] || 'bg-gray-100 text-gray-800'}`}>
                  {relProduct.category}
                </div>
              </div>
            </div>
            <div className="p-4 mx-3">
              <h4 className="font-medium text-[20px] text-[#213721] mb-2 font-mono group-hover:text-[#617C5F] transition-colors duration-300">
                {relProduct.name}
              </h4>
              <div className="flex justify-between items-center">
                <p className="text-[16px] text-[#213721] font-serif font-semibold group-hover:text-[#617C5F] transition-colors duration-300">
                  {relProduct.price}
                </p>
                <div className="text-lg text-green-950">★ ★ ★ ★ ☆</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}; 