import React from "react";
import moonlightCalm from "../../assets/moonlight-calm.png";
import manifestFire from "../../assets/manifest-fire.png";
import heartOpening from "../../assets/heart-opening.png";
import energyClearing from "../../assets/energy-clearing.png";
import intuitionCrystal from "../../assets/intuition-crystal.png";
import sacredRitual from "../../assets/sacred-ritual.png";
import protectionCharm from "../../assets/protection-charm.png";
import miniAltar from "../../assets/mini-altar.png";
import licensePortal from "../../assets/license-portal.png";

const products = [
  { name: "Moonlight Calm", price: "$20", image: moonlightCalm },
  { name: "Manifest Fire", price: "$23", image: manifestFire },
  { name: "Heart Opening", price: "$20", image: heartOpening },
  { name: "Energy Clearing Spray", price: "$20", image: energyClearing },
  { name: "Intuition Crystal Kit", price: "$23", image: intuitionCrystal },
  { name: "Sacred Ritual Journal", price: "$20", image: sacredRitual },
  { name: "Protection Charm Bundle", price: "$20", image: protectionCharm },
  { name: "Mini Altar Starter Kit", price: "$23", image: miniAltar },
  { name: "License to Portal – Access Tiers", price: "$20", image: licensePortal },
];

export const MerchandiseProductSection = () => {
  return (
    <section className="px-8 md:px-16 lg:px-24 xl:px-32 py-12 bg-white text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
      </div>
    </section>
  );
};

export const ProductCard = ({ name, price, image }) => (
  <div className="border-2 border-[#C8D8C0] bg-white hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
    <div className="flex justify-center flex-grow">
      <img src={image} alt={name} className="object-contain" />
    </div>
    <div className="p-4 mx-3">
      <h4 className="font-medium text-[20px] text-[#213721] mb-2 font-mono">
        {name}
      </h4>
      <div className="flex justify-between items-center">
        <p className="text-[16px] text-[#213721] font-serif font-semibold">
          {price}
        </p>
        <div className="text-lg text-green-950">★ ★ ★ ★ ☆</div>
      </div>
    </div>
        <div className="px-6 pb-4 mt-auto"> {/* Added padding and margin */}
      <button className="w-full bg-[#617C5F] text-white py-3 px-6 rounded-none hover:bg-[#4a6348] transition-colors duration-300">
        Buy Now
      </button>
    </div>
  </div>
);