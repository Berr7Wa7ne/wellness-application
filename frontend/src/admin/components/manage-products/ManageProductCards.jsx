import React from 'react'
import LavenderEssentialOil from '../../../assets/Lavender Essential Oil.jpg';
import MeditationLicensePro from '../../../assets/Meditation License Pro.jpg';
import WellnessJournal from '../../../assets/Wellness Journal.jpg';
import CrystalHealingKit from '../../../assets/Crystal Healing Kit.jpg';
import AromatherapyKit from '../../../assets/Aromatherapy Kit.jpg';
import YogaEbook from '../../../assets/Yoga Ebook.jpg';
import MindfulnessPoster from '../../../assets/Mindfulness Poster.jpg';
import HealingStoneSet from '../../../assets/Healing Stone Set.jpg';
import ScentedCandleSet from '../../../assets/Scented Candle Set.jpg';
import NatureSoundtrack from '../../../assets/Nature Soundtrack.jpg';
import FocusPlanner from '../../../assets/Focus Planner.jpg';
import ReikiEnergySet from '../../../assets/Reiki Energy Set.jpg';

const tierColors = {
    Basic: "bg-indigo-100 text-indigo-800 border border-indigo-200",
    Premium: "bg-pink-100 text-pink-700 border border-pink-200",
    Professional: "bg-orange-100 text-orange-700 border border-orange-200",
  };

const categoryColors = {
    Meditation: "bg-blue-100 text-blue-600",
    Yoga: "bg-green-100 text-green-600",
    Mindfulness: "bg-purple-100 text-purple-600",
    Wellness: "bg-yellow-100 text-yellow-700",
    Nutrition: "bg-pink-100 text-pink-600",
  };

const products = [
    {
      name: 'Lavender Essential Oil',
      tier: 'Premium',
      price: '$12.99',
      stock: '8 units',
      category: 'Wellness',
      image: LavenderEssentialOil,
    },
    {
      name: 'Meditation License Pro',
      tier: 'Premium',
      price: '$29.99',
      stock: '12 units',
      category: 'Meditation',
      image: MeditationLicensePro,
    },
    {
      name: 'Wellness Journal',
      tier: 'Basic',
      price: '$19.99',
      stock: '12 units',
      category: 'Wellness',
      image: WellnessJournal,
    },
    {
      name: 'Crystal Healing Kit',
      tier: 'Premium',
      price: '$49.99',
      stock: '6 units',
      category: 'Wellness',
      image: CrystalHealingKit,
    },
    {
      name: 'Aromatherapy Kit',
      tier: 'Professional',
      price: '$22.99',
      stock: '10 units',
      category: 'Wellness',
      image: AromatherapyKit,
    },
    {
      name: 'Yoga Ebook',
      tier: 'Premium',
      price: '$9.99',
      stock: '20 units',
      category: 'Yoga',
      image: YogaEbook,
    },
    {
      name: 'Mindfulness Poster',
      tier: 'Basic',
      price: '$15.99',
      stock: '5 units',
      category: 'Mindfulness',
      image: MindfulnessPoster,
    },
    {
      name: 'Healing Stone Set',
      tier: 'Professional',
      price: '$39.99',
      stock: '4 units',
      category: 'Wellness',
      image: HealingStoneSet,
    },
    {
      name: 'Scented Candle Set',
      tier: 'Basic',
      price: '$17.50',
      stock: '15 units',
      category: 'Wellness',
      image: ScentedCandleSet,
    },
    {
      name: 'Nature Soundtrack',
      tier: 'Professional',
      price: '$11.99',
      stock: '30 units',
      category: 'Mindfulness',
      image: NatureSoundtrack,
    },
    {
      name: 'Focus Planner',
      tier: 'Basic',
      price: '$14.99',
      stock: '9 units',
      category: 'Mindfulness',
      image: FocusPlanner,
    },
    {
      name: 'Reiki Energy Set',
      tier: 'Premium',
      price: '$59.99',
      stock: '2 units',
      category: 'Wellness',
      image: ReikiEnergySet,
    },
  ];
  
  const ManageProductCards = () => {
    return (
      <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {products.map((product, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow border border-gray-100">
            <div className="h-32 flex items-center justify-center bg-gray-100">
              <img src={product.image} alt={product.name} className="h-full object-contain" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
              <span className={`px-2 py-0.5 text-xs font-medium rounded ${categoryColors[product.category] || "bg-gray-200 text-gray-800"}`}>
                {product.category}
              </span>
              <button className="text-gray-500 hover:text-gray-700 text-sm">⋮</button>
              </div>
              <h3 className="font-medium text-gray-800 text-sm">{product.name}</h3>
              <div className="flex justify-between items-center my-2">
              <p className="text-sm text-gray-600 mt-1">{product.price}</p>
              <p className={`text-sm ${tierColors[product.tier] || "bg-gray-100 text-[#213721]"} px-2 py-1 rounded-md mt-1`}>{product.tier}</p>
              </div>
              <p className="text-xs text-gray-400 mt-1">Stock: {product.stock}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
export default ManageProductCards