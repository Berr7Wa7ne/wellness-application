import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const useProductPreviewLogic = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);

  // Dummy product data for demonstration. In a real app, you would fetch this from an API.
  const allProducts = [
    // Magickal Oils
    { name: "Moonlight Calm", price: "$24.99", description: "A calming oil for peaceful nights.", category: "Magickal Oils", image: "/src/assets/Moonlight Calm.jpg" },
    { name: "Manifest Fire", price: "$27.99", description: "Ignite your intentions with this powerful oil.", category: "Magickal Oils", image: "/src/assets/Manifest Fire.jpg" },
    { name: "Lavender Dream", price: "$24.99", description: "Soothing lavender for relaxation and dreams.", category: "Magickal Oils", image: "/src/assets/Lavender Dream.jpg" },
    { name: "Protection Blend", price: "$29.99", description: "Shield your aura with this protective blend.", category: "Magickal Oils", image: "/src/assets/Protection Blend.jpg" },
    { name: "Abundance Oil", price: "$27.99", description: "Attract prosperity and wealth.", category: "Magickal Oils", image: "/src/assets/Abundance Oil.jpg" },
    { name: "Healing Harmony", price: "$26.99", description: "Restore balance and promote healing.", category: "Magickal Oils", image: "/src/assets/Healing Harmony.jpg" },
    { name: "Spiritual Clarity", price: "$28.99", description: "Enhance intuition and spiritual insight.", category: "Magickal Oils", image: "/src/assets/Spiritual Clarity.jpg" },
    { name: "Love Attraction", price: "$25.99", description: "Draw love and positive relationships.", category: "Magickal Oils", image: "/src/assets/Love Attraction.jpg" },
    { name: "Grounding Essence", price: "$23.99", description: "Stay rooted and centered with this essence.", category: "Magickal Oils", image: "/src/assets/Grounding Essence.jpg" },

    // Meditation Videos
    { name: "Morning Mindfulness", price: "$15", description: "Start your day with peaceful awareness.", category: "Meditation Videos", image: "/src/assets/Morning Mindfulness.jpg" },
    { name: "Deep Sleep Journey", price: "$15", description: "Drift into restorative sleep.", category: "Meditation Videos", image: "/src/assets/Deep Sleep Journey.jpg" },
    { name: "Stress Relief Session", price: "$15", description: "Unwind and release tension.", category: "Meditation Videos", image: "/src/assets/Stress Relief Session.jpg" },
    { name: "Chakra Balancing", price: "$15", description: "Align and harmonize your energy centers.", category: "Meditation Videos", image: "/src/assets/Chakra Balancing.jpg" },
    { name: "Anxiety Relief", price: "$15", description: "Calm your mind and soothe anxiety.", category: "Meditation Videos", image: "/src/assets/Anxiety Relief.jpg" },
    { name: "Manifestation Practice", price: "$15", description: "Visualize and attract your desires.", category: "Meditation Videos", image: "/src/assets/Manifestation Practice.jpg" },
    { name: "Body Scan Relaxation", price: "$15", description: "Deep relaxation through body awareness.", category: "Meditation Videos", image: "/src/assets/Body Scan Relaxation.jpg" },
    { name: "Gratitude Meditation", price: "$15", description: "Cultivate appreciation and joy.", category: "Meditation Videos", image: "/src/assets/Gratitude Meditation.jpg" },
    { name: "Energy Clearing", price: "$15", description: "Cleanse your energetic field.", category: "Meditation Videos", image: "/src/assets/Energy Clearing.jpg" },

    // Licenses
    { name: "License to Portal – Access Tiers", price: "$99.99", description: "Unlock exclusive content and features.", category: "Licenses", image: "/src/assets/License to Portal.jpg" },
    { name: "Premium Access License", price: "$50", description: "Premium access to all resources.", category: "Licenses", image: "/src/assets/Premium Access License.jpg" },
    { name: "Professional Practitioner", price: "$100", description: "For professional use and client sessions.", category: "Licenses", image: "/src/assets/Professional Practitioner.jpg" },
    { name: "Student License", price: "$30", description: "Special pricing for students.", category: "Licenses", image: "/src/assets/Student License.jpg" },
    { name: "Group Access License", price: "$75", description: "Access for multiple users or groups.", category: "Licenses", image: "/src/assets/Group Access License.jpg" },
    { name: "Lifetime Access", price: "$200", description: "Unlimited access for life.", category: "Licenses", image: "/src/assets/Lifetime Access.jpg" },
    { name: "Family License", price: "$90", description: "Access for your entire family.", category: "Licenses", image: "/src/assets/Family License.jpg" },
    { name: "Corporate License", price: "$150", description: "Solutions for corporate wellness programs.", category: "Licenses", image: "/src/assets/Corporate License.jpg" },
    { name: "Community License", price: "$120", description: "Empower your community with wellness resources.", category: "Licenses", image: "/src/assets/Community License.jpg" },

    // Audio Guides
    { name: "Chakra Balancing Audio", price: "$12", description: "Audio guide for chakra alignment.", category: "Audio Guides", image: "/src/assets/Chakra Balancing Audio.jpg" },
    { name: "Manifestation Affirmations", price: "$12", description: "Powerful affirmations for manifestation.", category: "Audio Guides", image: "/src/assets/Manifestation Affirmations.jpg" },
    { name: "Healing Frequency Tones", price: "$12", description: "Restorative sound frequencies.", category: "Audio Guides", image: "/src/assets/Healing Frequency Tones.jpg" },
    { name: "Guided Visualization", price: "$12", description: "Visualize your goals with guided audio.", category: "Audio Guides", image: "/src/assets/Guided Visualization.jpg" },
    { name: "Sleep Soundscapes", price: "$12", description: "Relaxing sounds for deep sleep.", category: "Audio Guides", image: "/src/assets/Sleep Soundscapes.jpg" },
    { name: "Meditation Music", price: "$12", description: "Calming music for meditation.", category: "Audio Guides", image: "/src/assets/Meditation Music.jpg" },
    { name: "Nature Sounds", price: "$12", description: "Immerse yourself in tranquil nature.", category: "Audio Guides", image: "/src/assets/Nature Sounds.jpg" },
    { name: "Binaural Beats", price: "$12", description: "Brainwave entrainment for various states.", category: "Audio Guides", image: "/src/assets/Binaural Beats.jpg" },
    { name: "Sacred Mantras", price: "$12", description: "Chant ancient mantras for spiritual growth.", category: "Audio Guides", image: "/src/assets/Sacred Mantras.jpg" },

    // Healing Tools
    { name: "Intuition Crystal Kit", price: "$35", description: "Crystals to enhance your intuition.", category: "Healing Tools", image: "/src/assets/Intuition Crystal Kit.jpg" },
    { name: "Sacred Ritual Journal", price: "$20", description: "Document your spiritual journey.", category: "Healing Tools", image: "/src/assets/Sacred Ritual Journal.jpg" },
    { name: "Protection Charm Bundle", price: "$40", description: "Charms for protection and positive energy.", category: "Healing Tools", image: "/src/assets/Protection Charm Bundle.jpg" },
    { name: "Mini Altar Starter Kit", price: "$45", description: "Create your personal sacred space.", category: "Healing Tools", image: "/src/assets/Mini Altar Starter Kit.jpg" },
    { name: "Chakra Stones Set", price: "$30", description: "A complete set of chakra balancing stones.", category: "Healing Tools", image: "/src/assets/Chakra Stones Set.jpg" },
    { name: "Healing Wand", price: "$50", description: "Direct healing energy with this wand.", category: "Healing Tools", image: "/src/assets/Healing Wand.jpg" },
    { name: "Meditation Cushion", price: "$55", description: "Comfortable support for meditation.", category: "Healing Tools", image: "/src/assets/Meditation Cushion.jpg" },
    { name: "Sound Bowl", price: "$70", description: "Experience deep relaxation with sacred sounds.", category: "Healing Tools", image: "/src/assets/Sound Bowl.jpg" },
    { name: "Moon Phase Journal", price: "$18", description: "Track lunar cycles and intentions.", category: "Healing Tools", image: "/src/assets/Moon Phase Journal.jpg" },

    // Books & Journals
    { name: "Gratitude Journal", price: "$15", description: "Practice gratitude daily.", category: "Books & Journals", image: "/src/assets/Gratitude Journal.jpg" },
    { name: "Spell Book", price: "$25", description: "Unlock the magic within.", category: "Books & Journals", image: "/src/assets/Spell Book.jpg" },
    { name: "Meditation Workbook", price: "$20", description: "Guided exercises for meditation practice.", category: "Books & Journals", image: "/src/assets/Meditation Workbook.jpg" },
    { name: "Chakra Guide", price: "$22", description: "Understand and balance your chakras.", category: "Books & Journals", image: "/src/assets/Chakra Guide.jpg" },
    { name: "Crystal Healing Book", price: "$24", description: "Learn about crystal properties and uses.", category: "Books & Journals", image: "/src/assets/Crystal Healing Book.jpg" },
    { name: "Herbal Remedies Guide", price: "$23", description: "Natural remedies for mind, body, spirit.", category: "Books & Journals", image: "/src/assets/Herbal Remedies Guide.jpg" },
    { name: "Astrology Journal", price: "$21", description: "Explore your astrological chart and insights.", category: "Books & Journals", image: "/src/assets/Astrology Journal.jpg" },
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
