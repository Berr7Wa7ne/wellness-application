import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moonlightCalm from "../../../assets/moonlight-calm.png";
import manifestFire from "../../../assets/manifest-fire.png";
import heartOpening from "../../../assets/heart-opening.png";
import energyClearing from "../../../assets/energy-clearing.png";
import intuitionCrystal from "../../../assets/intuition-crystal.png";
import sacredRitual from "../../../assets/sacred-ritual.png";
import protectionCharm from "../../../assets/protection-charm.png";
import miniAltar from "../../../assets/mini-altar.png";
import licensePortal from "../../../assets/license-portal.png";

const productsByCategory = {
  "Ritual Essentials": [
    { name: "Moonlight Calm", price: "$20", image: moonlightCalm },
    { name: "Manifest Fire", price: "$23", image: manifestFire },
    { name: "Heart Opening", price: "$20", image: heartOpening },
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

export const ProductCard = ({ name, price, image }) => (
<div className="h-full flex flex-col">
  <div className="border-2 border-[#C8D8C0] flex-grow bg-white rounded-none overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
    <img
      src={image}
      alt={name}
      className="md:w-full md:h-[330px] object-cover"
    />
    <div className="p-6 flex-grow"> {/* Added flex-grow to push button down */}
      <h4 className="font-medium md:text-[28px] text-[16px] text-[#213721] mb-2 font-mono">{name}</h4>
      <div className="flex justify-between items-center">
        <p className="md:text-[22px] text-[12px] text-[#213721] font-serif font-semibold">{price}</p>
        <div className="text-xl text-green-950">★ ★ ★ ★ ☆</div>
      </div>
    </div>
    <div className="px-6 pb-4 mt-auto"> {/* Added padding and margin */}
      <button className="w-full bg-[#617C5F] text-white py-3 px-6 rounded-none hover:bg-[#4a6348] transition-colors duration-300">
        Buy Now
      </button>
    </div>
  </div>
</div>
);