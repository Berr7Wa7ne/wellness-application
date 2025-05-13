export const ProductCard = ({ name, price, image }) => (
  <div className="px-4">
    <div className="w-[250px] mx-auto bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="md:w-full md:h-[330px]  rounded-t-lg"
      />

      {/* Content */}
      <div className="p-4">
        <h4 className="font-medium md:text-[28px] text-[16px] text-[#213721] mb-1">{name}</h4>
        <div className="flex justify-between items-center">
        <p className="md:text-[22px] text-[12px] text-[#213721] mb-1">{price}</p>
        <div className="text-sm text-green-950">★ ★ ★ ★ ☆</div>
        </div>
      </div>
    </div>
  </div>
);
