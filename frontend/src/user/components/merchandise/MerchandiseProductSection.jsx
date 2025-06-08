import React, { useState, useEffect, useRef } from "react";
import moonlightCalm from "../../../assets/Moonlight Calm.jpg";
import manifestFire from "../../../assets/Manifest Fire.jpg";
import heartOpening from "../../../assets/Heart Opening.jpg";
import energyClearing from "../../../assets/Energy Clearing Spray.jpg";
import intuitionCrystal from "../../../assets/Intuition Crystal Kit.jpg";
import sacredRitual from "../../../assets/Sacred Ritual Journal.jpg";
import protectionCharm from "../../../assets/Protection Charm Bundle.jpg";
import miniAltar from "../../../assets/Mini Altar Starter Kit.jpg";
import licensePortal from "../../../assets/License to Portal.jpg";
import lavenderDream from "../../../assets/Lavender Dream.jpg";
import protectionBlend from "../../../assets/Protection Blend.jpg";
import abundanceOil from "../../../assets/Abundance Oil.jpg";
import healingHarmony from "../../../assets/Healing Harmony.jpg";
import spiritualClarity from "../../../assets/Spiritual Clarity.jpg";
import loveAttraction from "../../../assets/Love Attraction.jpg";
import groundingEssence from "../../../assets/Grounding Essence.jpg";
import morningMindfulness from "../../../assets/Morning Mindfulness.jpg";
import deepSleepJourney from "../../../assets/Deep Sleep Journey.jpg";
import stressRelief from "../../../assets/Stress Relief Session.jpg";
import chakraBalancing from "../../../assets/Chakra Balancing.jpg";
import anxietyRelief from "../../../assets/Anxiety Relief.jpg";
import manifestationPractice from "../../../assets/Manifestation Practice.jpg";
import bodyScanRelaxation from "../../../assets/Body Scan Relaxation.jpg";
import gratitudeMeditation from "../../../assets/Gratitude Meditation.jpg";
import energyClearingVideo from "../../../assets/Energy Clearing.jpg";
import premiumAccess from "../../../assets/Premium Access License.jpg";
import professionalPractitioner from "../../../assets/Professional Practitioner.jpg";
import studentLicense from "../../../assets/Student License.jpg";
import groupAccess from "../../../assets/Group Access License.jpg";
import lifetimeAccess from "../../../assets/Lifetime Access.jpg";
import familyLicense from "../../../assets/Family License.jpg";
import corporateLicense from "../../../assets/Corporate License.jpg";
import communityLicense from "../../../assets/Community License.jpg";
import chakraBalancingAudio from "../../../assets/Chakra Balancing Audio.jpg";
import manifestationAffirmations from "../../../assets/Manifestation Affirmations.jpg";
import healingFrequencyTones from "../../../assets/Healing Frequency Tones.jpg";
import guidedVisualization from "../../../assets/Guided Visualization.jpg";
import sleepSoundscapes from "../../../assets/Sleep Soundscapes.jpg";
import meditationMusic from "../../../assets/Meditation Music.jpg";
import natureSounds from "../../../assets/Nature Sounds.jpg";
import binauralBeats from "../../../assets/Binaural Beats.jpg";
import sacredMantras from "../../../assets/Sacred Mantras.jpg";
import chakraStonesSet from "../../../assets/Chakra Stones Set.jpg";
import healingWand from "../../../assets/Healing Wand.jpg";
import meditationCushion from "../../../assets/Meditation Cushion.jpg";
import soundBowl from "../../../assets/Sound Bowl.jpg";
import moonPhaseJournal from "../../../assets/Moon Phase Journal.jpg";
import gratitudeJournal from "../../../assets/Gratitude Journal.jpg";
import spellBook from "../../../assets/Spell Book.jpg";
import meditationWorkbook from "../../../assets/Meditation Workbook.jpg";
import chakraGuide from "../../../assets/Chakra Guide.jpg";
import crystalHealingBook from "../../../assets/Crystal Healing Book.jpg";
import herbalRemediesGuide from "../../../assets/Herbal Remedies Guide.jpg";
import astrologyJournal from "../../../assets/Astrology Journal.jpg";
import CategoryNavigation from "../shared/CategoryNavigation";
import Pagination from "../shared/Pagination";
import PaymentModal from "../shared/PaymentModal";
import PaymentForm from "../shared/PaymentForm";

const products = [
  // Magickal Oils (9 products)
  { 
    name: "Moonlight Calm", 
    price: "$24.99", 
    image: moonlightCalm,
    category: "Magickal Oils"
  },
  { 
    name: "Manifest Fire", 
    price: "$27.99", 
    image: manifestFire,
    category: "Magickal Oils"
  },
  { 
    name: "Lavender Dream", 
    price: "$24.99", 
    image: lavenderDream,
    category: "Magickal Oils"
  },
  { 
    name: "Protection Blend", 
    price: "$29.99", 
    image: protectionBlend,
    category: "Magickal Oils"
  },
  { 
    name: "Abundance Oil", 
    price: "$27.99", 
    image: abundanceOil,
    category: "Magickal Oils"
  },
  { 
    name: "Healing Harmony", 
    price: "$26.99", 
    image: healingHarmony,
    category: "Magickal Oils"
  },
  { 
    name: "Spiritual Clarity", 
    price: "$28.99", 
    image: spiritualClarity,
    category: "Magickal Oils"
  },
  { 
    name: "Love Attraction", 
    price: "$25.99", 
    image: loveAttraction,
    category: "Magickal Oils"
  },
  { 
    name: "Grounding Essence", 
    price: "$23.99", 
    image: groundingEssence,
    category: "Magickal Oils"
  },

  // Meditation Videos (9 products)
  { 
    name: "Morning Mindfulness", 
    price: "$15", 
    image: morningMindfulness,
    category: "Meditation Videos"
  },
  { 
    name: "Deep Sleep Journey", 
    price: "$15", 
    image: deepSleepJourney,
    category: "Meditation Videos"
  },
  { 
    name: "Stress Relief Session", 
    price: "$15", 
    image: stressRelief,
    category: "Meditation Videos"
  },
  { 
    name: "Chakra Balancing", 
    price: "$15", 
    image: chakraBalancing,
    category: "Meditation Videos"
  },
  { 
    name: "Anxiety Relief", 
    price: "$15", 
    image: anxietyRelief,
    category: "Meditation Videos"
  },
  { 
    name: "Manifestation Practice", 
    price: "$15", 
    image: manifestationPractice,
    category: "Meditation Videos"
  },
  { 
    name: "Body Scan Relaxation", 
    price: "$15", 
    image: bodyScanRelaxation,
    category: "Meditation Videos"
  },
  { 
    name: "Gratitude Meditation", 
    price: "$15", 
    image: gratitudeMeditation,
    category: "Meditation Videos"
  },
  { 
    name: "Energy Clearing", 
    price: "$15", 
    image: energyClearingVideo,
    category: "Meditation Videos"
  },

  // Licenses (9 products)
  { 
    name: "License to Portal – Access Tiers", 
    price: "$99.99", 
    image: licensePortal,
    category: "Licenses"
  },
  { 
    name: "Premium Access License", 
    price: "$50", 
    image: premiumAccess,
    category: "Licenses"
  },
  { 
    name: "Professional Practitioner", 
    price: "$100", 
    image: professionalPractitioner,
    category: "Licenses"
  },
  { 
    name: "Student License", 
    price: "$30", 
    image: studentLicense,
    category: "Licenses"
  },
  { 
    name: "Group Access License", 
    price: "$75", 
    image: groupAccess,
    category: "Licenses"
  },
  { 
    name: "Lifetime Access", 
    price: "$200", 
    image: lifetimeAccess,
    category: "Licenses"
  },
  { 
    name: "Family License", 
    price: "$90", 
    image: familyLicense,
    category: "Licenses"
  },
  { 
    name: "Corporate License", 
    price: "$150", 
    image: corporateLicense,
    category: "Licenses"
  },
  { 
    name: "Community License", 
    price: "$120", 
    image: communityLicense,
    category: "Licenses"
  },

  // Audio Guides (9 products)
  { 
    name: "Chakra Balancing Audio", 
    price: "$12", 
    image: chakraBalancingAudio,
    category: "Audio Guides"
  },
  { 
    name: "Manifestation Affirmations", 
    price: "$12", 
    image: manifestationAffirmations,
    category: "Audio Guides"
  },
  { 
    name: "Healing Frequency Tones", 
    price: "$12", 
    image: healingFrequencyTones,
    category: "Audio Guides"
  },
  { 
    name: "Guided Visualization", 
    price: "$12", 
    image: guidedVisualization,
    category: "Audio Guides"
  },
  { 
    name: "Sleep Soundscapes", 
    price: "$12", 
    image: sleepSoundscapes,
    category: "Audio Guides"
  },
  { 
    name: "Meditation Music", 
    price: "$12", 
    image: meditationMusic,
    category: "Audio Guides"
  },
  { 
    name: "Nature Sounds", 
    price: "$12", 
    image: natureSounds,
    category: "Audio Guides"
  },
  { 
    name: "Binaural Beats", 
    price: "$12", 
    image: binauralBeats,
    category: "Audio Guides"
  },
  { 
    name: "Sacred Mantras", 
    price: "$12", 
    image: sacredMantras,
    category: "Audio Guides"
  },

  // Healing Tools (9 products)
  {
    name: "Chakra Stones Set",
    price: "$49.99",
    image: chakraStonesSet,
    category: "Healing Tools",
  },
  {
    name: "Healing Wand",
    price: "$39.99",
    image: healingWand,
    category: "Healing Tools",
  },
  {
    name: "Meditation Cushion",
    price: "$34.99",
    image: meditationCushion,
    category: "Healing Tools",
  },
  {
    name: "Sound Bowl",
    price: "$89.99",
    image: soundBowl,
    category: "Healing Tools",
  },
  {
    name: "Heart Opening",
    price: "$44.99",
    image: heartOpening,
    category: "Healing Tools",
  },
  {
    name: "Energy Clearing Spray",
    price: "$29.99",
    image: energyClearing,
    category: "Healing Tools",
  },
  {
    name: "Intuition Crystal Kit",
    price: "$54.99",
    image: intuitionCrystal,
    category: "Healing Tools",
  },
  {
    name: "Protection Charm Bundle",
    price: "$39.99",
    image: protectionCharm,
    category: "Healing Tools",
  },
  {
    name: "Mini Altar Starter Kit",
    price: "$49.99",
    image: miniAltar,
    category: "Healing Tools",
  },

  // Books & Journals (9 products)
  { 
    name: "Sacred Ritual Journal", 
    price: "$24.99", 
    image: sacredRitual,
    category: "Books & Journals"
  },
  { 
    name: "Moon Phase Journal", 
    price: "$18", 
    image: moonPhaseJournal,
    category: "Books & Journals"
  },
  { 
    name: "Gratitude Journal", 
    price: "$15", 
    image: gratitudeJournal,
    category: "Books & Journals"
  },
  { 
    name: "Spell Book", 
    price: "$25", 
    image: spellBook,
    category: "Books & Journals"
  },
  { 
    name: "Meditation Workbook", 
    price: "$20", 
    image: meditationWorkbook,
    category: "Books & Journals"
  },
  { 
    name: "Chakra Guide", 
    price: "$22", 
    image: chakraGuide,
    category: "Books & Journals"
  },
  { 
    name: "Crystal Healing Book", 
    price: "$24", 
    image: crystalHealingBook,
    category: "Books & Journals"
  },
  { 
    name: "Herbal Remedies Guide", 
    price: "$23", 
    image: herbalRemediesGuide,
    category: "Books & Journals"
  },
  { 
    name: "Astrology Journal", 
    price: "$21", 
    image: astrologyJournal,
    category: "Books & Journals"
  }
];

export const MerchandiseProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Magickal Oils");
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const itemsPerPage = 6;
  const gridRef = useRef(null);

  useEffect(() => {
    setIsActive(true);
  }, []);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const scrollToGrid = () => {
    if (gridRef.current) {
      const headerOffset = 100;
      const elementPosition = gridRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTimeout(scrollToGrid, 100);
  };

  const handleBuyNowClick = (product) => {
    setSelectedProduct(product);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(
    product => product.category === selectedCategory
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="py-16">
      <CategoryNavigation
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategoryChange}
      />
      <section 
        className={`px-8 md:px-16 lg:px-24 xl:px-32 py-12 bg-white text-black transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
        ref={gridRef}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product, idx) => (
            <div key={idx}>
              <ProductCard {...product} onBuyNowClick={handleBuyNowClick} />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>

      <PaymentModal isOpen={isPaymentModalOpen} onClose={handleClosePaymentModal}>
        {selectedProduct && (
          <div>
            <PaymentForm onClose={handleClosePaymentModal} />
          </div>
        )}
      </PaymentModal>
    </div>
  );
};

export const ProductCard = ({ name, price, image, onBuyNowClick }) => (
  <div className="border-2 border-[#C8D8C0] rounded-lg bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
    <div className="relative w-full pt-[50%]">
      <div className="absolute inset-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
    <div className="p-4 mx-3">
      <h4 className="font-medium text-[20px] text-[#213721] mb-2 font-mono group-hover:text-[#617C5F] transition-colors duration-300">
        {name}
      </h4>
      <div className="flex justify-between items-center">
        <p className="text-[16px] text-[#213721] font-serif font-semibold group-hover:text-[#617C5F] transition-colors duration-300">
          {price}
        </p>
        <div className="text-lg text-green-950">★ ★ ★ ★ ☆</div>
      </div>
    </div>
    <div className="px-6 pb-4 mt-auto">
      <button
        className="w-full bg-[#213721] text-white py-3 px-6 rounded-none hover:bg-green-800 transition-all duration-300 transform hover:scale-[1.02]"
        onClick={() => onBuyNowClick({ name, price, image })}
      >
        Buy Now
      </button>
    </div>
  </div>
);