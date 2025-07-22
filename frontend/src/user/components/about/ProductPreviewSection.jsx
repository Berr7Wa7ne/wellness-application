import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../context/api/config';
import { useCategories } from '../../../context/user/category/CategoryContext';



const ScrollableRow = ({ products, categoryColors, categories }) => {
  const containerRef = useRef(null);
  const isHoveredRef = useRef(false);
  const animationRef = useRef(null);
  const singleListWidthRef = useRef(0);

  const extendedProducts = [...products, ...products, ...products];

  const scroll = (direction) => {
    const { current } = containerRef;
    if (!current) return;
    const scrollAmount = 300;
    direction === "left"
      ? (current.scrollLeft -= scrollAmount)
      : (current.scrollLeft += scrollAmount);
  };

  const animateScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isHoveredRef.current) {
      container.scrollLeft += 1; // smoother step

      // Reset if scroll reaches end of second set
      const maxScroll = singleListWidthRef.current * 2;
      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft = singleListWidthRef.current;
      }
    }

    animationRef.current = requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const fullWidth = container.scrollWidth;
    const singleListWidth = fullWidth / 3;
    singleListWidthRef.current = singleListWidth;

    container.scrollLeft = singleListWidth;

    animationRef.current = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(animationRef.current);
  }, []);


  return (
    <div
      className="relative group"
      onMouseEnter={() => (isHoveredRef.current = true)}
      onMouseLeave={() => (isHoveredRef.current = false)}
    >
      {/* Chevron Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-[#617C5F] hover:text-white transition-transform hover:scale-105"
      >
        <ChevronLeft />
      </button>

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="overflow-x-auto scroll-smooth px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="flex gap-8">
          {extendedProducts.map((product, index) => (
            <div key={index} className="flex-shrink-0 w-[280px] px-4">
              <ProductCard {...product} categoryColors={categoryColors} categories={categories} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-[#617C5F] hover:text-white transition-transform hover:scale-105"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export const ProductPreviewSection = () => {
  const { slug } = useParams();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  console.log('Categories in component:', categories);

  useEffect(() => {
    api.get('/public/products/preview')
      .then(res => setPreview(res.data.data))
      .catch(err => setError('Failed to load product previews.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading || categoriesLoading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-12">{error}</div>;
  if (categoriesError) return <div className="text-center text-red-500 py-12">{categoriesError}</div>;
  if (!preview) return null;

  // Build the color map
  const categoryColors = {};
  categories.forEach(cat => {
    categoryColors[cat.name] = `${cat.backgroundColor} ${cat.textColor}`;
  });
  console.log('Category colors map:', categoryColors);

  // Get all categories from any section (they should be the same)
  const categoriesFromPreview = Object.keys(preview.mostValuable || {});

  const sections = [
    { title: 'Most Valuable', key: 'mostValuable' },
    { title: 'Top Selling', key: 'topSelling' },
    { title: 'Least Valuable', key: 'leastValuable' },
  ];

  return (
    <section className="product-preview px-4 py-12 bg-white text-black">
      <p className="md:text-[28px] text-[16px] text-[#617C5F] text-center mb-4 font-serif">
        Popular Category
      </p>
      <h2 className="text-center md:text-[56px] text-[27px] text-[#213721] font-semibold md:mb-8">
        Explore the essence of<br />elegance
      </h2>
      {sections.map((section, idx) => (
        <div key={section.key} className="py-6 md:mb-10">
          <h3 className="md:text-[40px] text-[20px] text-[#213721] font-semibold mb-10 px-16">
            {section.title}
          </h3>
          <ScrollableRow
            products={categoriesFromPreview
              .map(cat => preview[section.key][cat])
              .filter(Boolean)
            }
            categoryColors={categoryColors}
            categories={categories}
          />
        </div>
      ))}
    </section>
  );
};

export const ProductCard = (props) => {
  console.log('ProductCard props:', props);
  const { slug, name, price, image, category, categoryColors, imageUrl, categories } = props;
  const navigate = useNavigate();

  // Debug logs for color mapping
  console.log('ProductCard category:', category);
  console.log('Available categoryColors keys:', Object.keys(categoryColors));
  console.log('Resolved color:', categoryColors[category]);

  const handleBuyNowClick = () => {
    navigate(`/product-preview/${slug}`);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-2 border-[#C8D8C0] flex-grow bg-white rounded-none overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
        <div className="relative">
          <img
            src={imageUrl || image}
            alt={name}
            className="md:w-full md:h-[330px] object-cover"
          />
          <div className="absolute top-2 left-2">
          <span
  className="px-2 py-1 rounded-full text-xs font-medium"
  style={{
    backgroundColor: categories.find(cat => cat.name === category)?.backgroundColor,
    color: categories.find(cat => cat.name === category)?.textColor
  }}
>
  {category}
</span>
          </div>
        </div>
        <div className="p-6 flex-grow">
          <h4 className="font-medium md:text-[28px] text-[16px] text-[#213721] mb-2 font-mono">{name}</h4>
          <div className="flex justify-between items-center">
            <p className="md:text-[22px] text-[12px] text-[#213721] font-serif font-semibold">{typeof price === 'number' ? `$${price.toFixed(2)}` : price}</p>
            <div className="text-xl text-green-950">★ ★ ★ ★ ☆</div>
          </div>
        </div>
        <div className="px-6 pb-4 mt-auto">
          <button 
            onClick={handleBuyNowClick}
            className="w-full bg-[#617C5F] text-white py-3 px-6 rounded-none hover:bg-[#4a6348] transition-colors duration-300"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
