import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Import all product images
import moonlightCalm from '../../assets/Moonlight Calm.jpg';
import manifestFire from '../../assets/Manifest Fire.jpg';
import lavenderDream from '../../assets/Lavender Dream.jpg';
import protectionBlend from '../../assets/Protection Blend.jpg';
import abundanceOil from '../../assets/Abundance Oil.jpg';
import healingHarmony from '../../assets/Healing Harmony.jpg';
import spiritualClarity from '../../assets/Spiritual Clarity.jpg';
import loveAttraction from '../../assets/Love Attraction.jpg';
import groundingEssence from '../../assets/Grounding Essence.jpg';
import morningMindfulness from '../../assets/Morning Mindfulness.jpg';
import deepSleepJourney from '../../assets/Deep Sleep Journey.jpg';
import stressReliefSession from '../../assets/Stress Relief Session.jpg';
import chakraBalancing from '../../assets/Chakra Balancing.jpg';
import anxietyRelief from '../../assets/Anxiety Relief.jpg';
import manifestationPractice from '../../assets/Manifestation Practice.jpg';
import bodyScanRelaxation from '../../assets/Body Scan Relaxation.jpg';
import gratitudeMeditation from '../../assets/Gratitude Meditation.jpg';
import energyClearing from '../../assets/Energy Clearing.jpg';
import licensePortal from '../../assets/License to Portal.jpg';
import premiumAccess from '../../assets/Premium Access License.jpg';
import professionalPractitioner from '../../assets/Professional Practitioner.jpg';
import studentLicense from '../../assets/Student License.jpg';
import groupAccess from '../../assets/Group Access License.jpg';
import lifetimeAccess from '../../assets/Lifetime Access.jpg';
import familyLicense from '../../assets/Family License.jpg';
import corporateLicense from '../../assets/Corporate License.jpg';
import communityLicense from '../../assets/Community License.jpg';
import chakraBalancingAudio from '../../assets/Chakra Balancing Audio.jpg';
import manifestationAffirmations from '../../assets/Manifestation Affirmations.jpg';
import healingFrequency from '../../assets/Healing Frequency Tones.jpg';
import guidedVisualization from '../../assets/Guided Visualization.jpg';
import sleepSoundscapes from '../../assets/Sleep Soundscapes.jpg';
import meditationMusic from '../../assets/Meditation Music.jpg';
import natureSounds from '../../assets/Nature Sounds.jpg';
import binauralBeats from '../../assets/Binaural Beats.jpg';
import sacredMantras from '../../assets/Sacred Mantras.jpg';
import intuitionCrystal from '../../assets/Intuition Crystal Kit.jpg';
import sacredRitual from '../../assets/Sacred Ritual Journal.jpg';
import protectionCharm from '../../assets/Protection Charm Bundle.jpg';
import miniAltar from '../../assets/Mini Altar Starter Kit.jpg';
import chakraStonesSet from '../../assets/Chakra Stones Set.jpg';
import healingWand from '../../assets/Healing Wand.jpg';
import meditationCushion from '../../assets/Meditation Cushion.jpg';
import soundBowl from '../../assets/Sound Bowl.jpg';
import moonPhaseJournal from '../../assets/Moon Phase Journal.jpg';
import gratitudeJournal from '../../assets/Gratitude Journal.jpg';
import spellBook from '../../assets/Spell Book.jpg';
import meditationWorkbook from '../../assets/Meditation Workbook.jpg';
import chakraGuide from '../../assets/Chakra Guide.jpg';
import crystalHealing from '../../assets/Crystal Healing Book.jpg';
import herbalRemedies from '../../assets/Herbal Remedies Guide.jpg';
import astrologyJournal from '../../assets/Astrology Journal.jpg';

export const useProductPreviewLogic = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);

  // Dummy product data for demonstration. In a real app, you would fetch this from an API.
  const allProducts = [
    // Magickal Oils
    { name: "Moonlight Calm", price: "$24.99", description: "A calming oil for peaceful nights.", category: "Magickal Oils", image: moonlightCalm },
    { name: "Manifest Fire", price: "$27.99", description: "Ignite your intentions with this powerful oil.", category: "Magickal Oils", image: manifestFire },
    { name: "Lavender Dream", price: "$24.99", description: "Soothing lavender for relaxation and dreams.", category: "Magickal Oils", image: lavenderDream },
    { name: "Protection Blend", price: "$29.99", description: "Shield your aura with this protective blend.", category: "Magickal Oils", image: protectionBlend },
    { name: "Abundance Oil", price: "$27.99", description: "Attract prosperity and wealth.", category: "Magickal Oils", image: abundanceOil },
    { name: "Healing Harmony", price: "$26.99", description: "Restore balance and promote healing.", category: "Magickal Oils", image: healingHarmony },
    { name: "Spiritual Clarity", price: "$28.99", description: "Enhance intuition and spiritual insight.", category: "Magickal Oils", image: spiritualClarity },
    { name: "Love Attraction", price: "$25.99", description: "Draw love and positive relationships.", category: "Magickal Oils", image: loveAttraction },
    { name: "Grounding Essence", price: "$23.99", description: "Stay rooted and centered with this essence.", category: "Magickal Oils", image: groundingEssence },

    // Meditation Videos
    { name: "Morning Mindfulness", price: "$15", description: "Start your day with peaceful awareness.", category: "Meditation Videos", image: morningMindfulness },
    { name: "Deep Sleep Journey", price: "$15", description: "Drift into restorative sleep.", category: "Meditation Videos", image: deepSleepJourney },
    { name: "Stress Relief Session", price: "$15", description: "Unwind and release tension.", category: "Meditation Videos", image: stressReliefSession },
    { name: "Chakra Balancing", price: "$15", description: "Align and harmonize your energy centers.", category: "Meditation Videos", image: chakraBalancing },
    { name: "Anxiety Relief", price: "$15", description: "Calm your mind and soothe anxiety.", category: "Meditation Videos", image: anxietyRelief },
    { name: "Manifestation Practice", price: "$15", description: "Visualize and attract your desires.", category: "Meditation Videos", image: manifestationPractice },
    { name: "Body Scan Relaxation", price: "$15", description: "Deep relaxation through body awareness.", category: "Meditation Videos", image: bodyScanRelaxation },
    { name: "Gratitude Meditation", price: "$15", description: "Cultivate appreciation and joy.", category: "Meditation Videos", image: gratitudeMeditation },
    { name: "Energy Clearing", price: "$15", description: "Cleanse your energetic field.", category: "Meditation Videos", image: energyClearing },

    // Licenses
    { name: "License to Portal – Access Tiers", price: "$99.99", description: "Unlock exclusive content and features.", category: "Licenses", image: licensePortal },
    { name: "Premium Access License", price: "$50", description: "Premium access to all resources.", category: "Licenses", image: premiumAccess },
    { name: "Professional Practitioner", price: "$100", description: "For professional use and client sessions.", category: "Licenses", image: professionalPractitioner },
    { name: "Student License", price: "$30", description: "Special pricing for students.", category: "Licenses", image: studentLicense },
    { name: "Group Access License", price: "$75", description: "Access for multiple users or groups.", category: "Licenses", image: groupAccess },
    { name: "Lifetime Access", price: "$200", description: "Unlimited access for life.", category: "Licenses", image: lifetimeAccess },
    { name: "Family License", price: "$90", description: "Access for your entire family.", category: "Licenses", image: familyLicense },
    { name: "Corporate License", price: "$150", description: "Solutions for corporate wellness programs.", category: "Licenses", image: corporateLicense },
    { name: "Community License", price: "$120", description: "Empower your community with wellness resources.", category: "Licenses", image: communityLicense },

    // Audio Guides
    { name: "Chakra Balancing Audio", price: "$12", description: "Audio guide for chakra alignment.", category: "Audio Guides", image: chakraBalancingAudio },
    { name: "Manifestation Affirmations", price: "$12", description: "Powerful affirmations for manifestation.", category: "Audio Guides", image: manifestationAffirmations },
    { name: "Healing Frequency Tones", price: "$12", description: "Restorative sound frequencies.", category: "Audio Guides", image: healingFrequency },
    { name: "Guided Visualization", price: "$12", description: "Visualize your goals with guided audio.", category: "Audio Guides", image: guidedVisualization },
    { name: "Sleep Soundscapes", price: "$12", description: "Relaxing sounds for deep sleep.", category: "Audio Guides", image: sleepSoundscapes },
    { name: "Meditation Music", price: "$12", description: "Calming music for meditation.", category: "Audio Guides", image: meditationMusic },
    { name: "Nature Sounds", price: "$12", description: "Immerse yourself in tranquil nature.", category: "Audio Guides", image: natureSounds },
    { name: "Binaural Beats", price: "$12", description: "Brainwave entrainment for various states.", category: "Audio Guides", image: binauralBeats },
    { name: "Sacred Mantras", price: "$12", description: "Chant ancient mantras for spiritual growth.", category: "Audio Guides", image: sacredMantras },

    // Healing Tools
    { name: "Intuition Crystal Kit", price: "$35", description: "Crystals to enhance your intuition.", category: "Healing Tools", image: intuitionCrystal },
    { name: "Sacred Ritual Journal", price: "$20", description: "Document your spiritual journey.", category: "Healing Tools", image: sacredRitual },
    { name: "Protection Charm Bundle", price: "$40", description: "Charms for protection and positive energy.", category: "Healing Tools", image: protectionCharm },
    { name: "Mini Altar Starter Kit", price: "$45", description: "Create your personal sacred space.", category: "Healing Tools", image: miniAltar },
    { name: "Chakra Stones Set", price: "$30", description: "A complete set of chakra balancing stones.", category: "Healing Tools", image: chakraStonesSet },
    { name: "Healing Wand", price: "$50", description: "Direct healing energy with this wand.", category: "Healing Tools", image: healingWand },
    { name: "Meditation Cushion", price: "$55", description: "Comfortable support for meditation.", category: "Healing Tools", image: meditationCushion },
    { name: "Sound Bowl", price: "$70", description: "Experience deep relaxation with sacred sounds.", category: "Healing Tools", image: soundBowl },
    { name: "Moon Phase Journal", price: "$18", description: "Track lunar cycles and intentions.", category: "Healing Tools", image: moonPhaseJournal },

    // Books & Journals
    { name: "Gratitude Journal", price: "$15", description: "Practice gratitude daily.", category: "Books & Journals", image: gratitudeJournal },
    { name: "Spell Book", price: "$25", description: "Unlock the magic within.", category: "Books & Journals", image: spellBook },
    { name: "Meditation Workbook", price: "$20", description: "Guided exercises for meditation practice.", category: "Books & Journals", image: meditationWorkbook },
    { name: "Chakra Guide", price: "$22", description: "Understand and balance your chakras.", category: "Books & Journals", image: chakraGuide },
    { name: "Crystal Healing Book", price: "$24", description: "Learn about crystal properties and uses.", category: "Books & Journals", image: crystalHealing },
    { name: "Herbal Remedies Guide", price: "$23", description: "Natural remedies for mind, body, spirit.", category: "Books & Journals", image: herbalRemedies },
    { name: "Astrology Journal", price: "$21", description: "Explore your astrological chart and insights.", category: "Books & Journals", image: astrologyJournal },
  ];

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.name.replace(/\s/g, '-') === productName);
    setProduct(foundProduct);
  }, [productName]);

  const handleAddToCart = () => {
    // Implement add to cart logic here
    setIsAddToCartModalOpen(true);
  };

  const handleCloseAddToCartModal = () => {
    setIsAddToCartModalOpen(false);
  };

  const handleBuyNow = () => {
    // Implement buy now logic here (e.g., redirect to checkout)
    alert(`Buying ${product.name} now!`); // Placeholder for actual payment flow
  };

  const relatedProducts = product 
    ? allProducts.filter(p => p.name !== product.name) // Get all products except current one
    : [];

  return {
    product,
    relatedProducts,
    isAddToCartModalOpen,
    setIsAddToCartModalOpen,
    handleAddToCart,
    handleCloseAddToCartModal,
    handleBuyNow,
    navigate, // Expose navigate if needed in the component for other actions
  };
};
