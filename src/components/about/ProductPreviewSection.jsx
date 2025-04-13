import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moonlightCalm from "../../assets/moonlight-calm.png";
import manifestFire from "../../assets/manifest-fire.png";
import heartOpening from "../../assets/heart-opening.png";
import energyClearing from "../../assets/energy-clearing.png";
import intuitionCrystal from "../../assets/intuition-crystal.png";
import sacredRitual from "../../assets/sacred-ritual.png";
import protectionCharm from "../../assets/protection-charm.png";
import miniAltar from "../../assets/mini-altar.png";
import licensePortal from "../../assets/license-portal.png";

const productsByCategory = {
  "Ritual Essentials": [
    { name: "Moonlight Calm", price: "$20", image: moonlightCalm },
    { name: "Manifest Fire – Magickal Oil", price: "$23", image: manifestFire },
    { name: "Heart Opening – Magickal Oil", price: "$20", image: heartOpening },
  ],
  "Spiritual Power & Protection": [
    { name: "Energy Clearing Spray", price: "$20", image: energyClearing },
    { name: "Intuition Crystal Kit", price: "$23", image: intuitionCrystal },
    { name: "Sacred Ritual Journal", price: "$20", image: sacredRitual },
  ],
  "Manifestation & Transformation": [
    { name: "Protection Charm Bundle", price: "$20", image: protectionCharm },
    { name: "Mini Altar Starter Kit", price: "$23", image: miniAltar },
    { name: "License to Portal – Access Tiers", price: "$20", image: licensePortal },
  ],
};

const ScrollableRow = ({ products }) => {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const { current } = containerRef;
    if (!current) return;
    const scrollAmount = 300;
    direction === "left"
      ? (current.scrollLeft -= scrollAmount)
      : (current.scrollLeft += scrollAmount);
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-gray-100"
      >
        <ChevronLeft />
      </button>

      <div
        ref={containerRef}
        className="overflow-x-auto scroll-smooth no-scrollbar px-8"
      >
        <div className="flex justify-center gap-8"> {/* Increased gap from gap-0 to gap-8 */}
          {products.map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] px-4" 
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-gray-100"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export const ProductPreviewSection = () => {
  return (
    <section className="px-4 py-12 bg-white text-black">
      <p className="text-[28px] text-[#617C5F] text-center mb-4">
        Popular Category
      </p>
      <h2 className="text-center text-[56px] text-[#213721] font-semibold mb-8">
        Explore the essence of<br />elegance
      </h2>
      {Object.entries(productsByCategory).map(([category, products], idx) => (
        <div key={idx} className="py-6 mb-10">
          <h3 className="text-[40px] text-[#213721] font-semibold mb-10 px-16">{category}</h3>
          <ScrollableRow products={products} />
        </div>
      ))}
    </section>
  );
};

export const ProductCard = ({ name, price, image }) => (
  <div className="h-full flex flex-col">
    <div className="border-2 border-[#C8D8C0] flex-grow bg-white rounded-none overflow-hidden hover:shadow-md transition-shadow duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-[330px] object-cover"
      />
      <div className="p-6"> {/* Increased padding */}
        <h4 className="font-medium text-[28px] text-[#213721] mb-2">{name}</h4>
        <div className="flex justify-between items-center">
          <p className="text-[22px] text-[#213721]">{price}</p>
          <div className="text-sm text-green-950">★ ★ ★ ★ ☆</div>
        </div>
      </div>
    </div>
  </div>
);