import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moonlightCalm from "../../../assets/Moonlight Calm.jpg";
import manifestFire from "../../../assets/Manifest Fire.jpg";
import heartOpening from "../../../assets/Heart Opening.jpg";
import energyClearing from "../../../assets/Energy Clearing.jpg";
import intuitionCrystal from "../../../assets/Intuition Crystal Kit.jpg";
import sacredRitual from "../../../assets/Sacred Ritual Journal.jpg";
import protectionCharm from "../../../assets/Protection Charm Bundle.jpg";
import miniAltar from "../../../assets/Mini Altar Starter Kit.jpg";
import licensePortal from "../../../assets/License to Portal.jpg";
import chakraStonesSet from "../../../assets/Chakra Stones Set.jpg";
import protectionBlend from "../../../assets/Protection Blend.jpg";
import healingWand from "../../../assets/Healing Wand.jpg";
import abundanceOil from "../../../assets/Abundance Oil.jpg";
import manifestationPractice from "../../../assets/Manifestation Practice.jpg";
import premiumAccess from "../../../assets/Premium Access License.jpg";

const productsByCategory = {
  "Ritual Essentials": [
    { name: "Moonlight Calm", price: "$20", image: moonlightCalm, category: "Magickal Oils" },
    { name: "Manifest Fire", price: "$23", image: manifestFire, category: "Magickal Oils" },
    { name: "Heart Opening", price: "$20", image: heartOpening, category: "Magickal Oils" },
    { name: "Chakra Stones Set", price: "$49.99", image: chakraStonesSet, category: "Healing Tools" },
    { name: "Sacred Ritual Journal", price: "$24.99", image: sacredRitual, category: "Books & Journals" },
    { name: "Healing Wand", price: "$39.99", image: healingWand, category: "Healing Tools" },
  ],
  "Spiritual Power & Protection": [
    { name: "Energy Clearing Spray", price: "$20", image: energyClearing, category: "Healing Tools" },
    { name: "Intuition Crystal Kit", price: "$23", image: intuitionCrystal, category: "Healing Tools" },
    { name: "Sacred Ritual Journal", price: "$20", image: sacredRitual, category: "Books & Journals" },
    { name: "Protection Blend", price: "$29.99", image: protectionBlend, category: "Magickal Oils" },
    { name: "Protection Charm Bundle", price: "$39.99", image: protectionCharm, category: "Healing Tools" },
    { name: "Mini Altar Starter Kit", price: "$49.99", image: miniAltar, category: "Healing Tools" },
  ],
  "Manifestation & Transformation": [
    { name: "Protection Charm Bundle", price: "$20", image: protectionCharm, category: "Healing Tools" },
    { name: "Mini Altar Starter Kit", price: "$23", image: miniAltar, category: "Healing Tools" },
    { name: "License to Portal – Access Tiers", price: "$20", image: licensePortal, category: "Licenses" },
    { name: "Abundance Oil", price: "$27.99", image: abundanceOil, category: "Magickal Oils" },
    { name: "Manifestation Practice", price: "$15", image: manifestationPractice, category: "Audio Guides" },
    { name: "Premium Access License", price: "$50", image: premiumAccess, category: "Licenses" },
  ],
};

const ScrollableRow = ({ products }) => {
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
              <ProductCard {...product} />
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

const categoryColors = {
  'Magickal Oils': "bg-rose-100 text-rose-800",
  'Meditation Videos': "bg-green-100 text-green-600",
  'Licenses': "bg-purple-100 text-purple-600",
  'Audio Guides': "bg-orange-100 text-orange-600",
  'Healing Tools': "bg-blue-100 text-blue-600",
  'Books & Journals': "bg-cyan-100 text-cyan-600",
};

export const ProductPreviewSection = () => {
  return (
    <section className="product-preview px-4 py-12 bg-white text-black">
      <p className="md:text-[28px] text-[16px] text-[#617C5F] text-center mb-4 font-serif">
        Popular Category
      </p>
      <h2 className="text-center md:text-[56px] text-[27px] text-[#213721] font-semibold md:mb-8">
        Explore the essence of<br />elegance
      </h2>
      {Object.entries(productsByCategory).map(([category, products], idx) => (
        <div key={idx} className="py-6 md:mb-10">
          <h3 className="md:text-[40px] text-[20px] text-[#213721] font-semibold mb-10 px-16">{category}</h3>
          <ScrollableRow products={products} />
        </div>
      ))}
    </section>
  );
};

export const ProductCard = ({ name, price, image, category }) => (
  <div className="h-full flex flex-col">
    <div className="border-2 border-[#C8D8C0] flex-grow bg-white rounded-none overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="md:w-full md:h-[330px] object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[category]}`}>
            {category}
          </span>
        </div>
      </div>
      <div className="p-6 flex-grow">
        <h4 className="font-medium md:text-[28px] text-[16px] text-[#213721] mb-2 font-mono">{name}</h4>
        <div className="flex justify-between items-center">
          <p className="md:text-[22px] text-[12px] text-[#213721] font-serif font-semibold">{price}</p>
          <div className="text-xl text-green-950">★ ★ ★ ★ ☆</div>
        </div>
      </div>
      <div className="px-6 pb-4 mt-auto">
        <button className="w-full bg-[#617C5F] text-white py-3 px-6 rounded-none hover:bg-[#4a6348] transition-colors duration-300">
          Buy Now
        </button>
      </div>
    </div>
  </div>
);
