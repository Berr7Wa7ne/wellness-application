import React from 'react'
import { Video, Clock, Users, Trash2, Pencil } from 'lucide-react';
import GuidedMeditationSessions from '../../../assets/Guided Meditation Sessions.jpg';
import GroupYogaClasses from '../../../assets/Group Yoga Classes.jpg';
import WellnessConsultation from '../../../assets/Wellness Consultation.jpg';
import CrystalBowlSoundBath from '../../../assets/Crystal Bowl Sound Bath.jpg';
import ReikiEnergySession from '../../../assets/Reiki Energy Session.jpg';
import ChakraAlignmentTherapy from '../../../assets/Chakra Alignment Therapy.jpg';
import AromatherapyMassage from '../../../assets/Aromatherapy Massage.jpg';
import GuidedBreathworkSession from '../../../assets/Guided Breathwork Session.jpg';
import CrystalTherapySession from '../../../assets/Crystal Therapy Session.jpg';
import AyurvedicLifestyleConsultation from '../../../assets/Ayurvedic Lifestyle Consultation.jpg';
import IntuitiveTarotCardReading from '../../../assets/Intuitive Tarot Card Reading.jpg';
import QiGongEnergyPractice from '../../../assets/Qi Gong Energy Practice.jpg';

const tierColors = {
    Basic: "bg-indigo-100 text-indigo-800 border border-indigo-200",
    Premium: "bg-pink-100 text-pink-700 border border-pink-200",
    Professional: "bg-orange-100 text-orange-700 border border-orange-200",
  };

const services = [
  {
    name: 'Guided Meditation Sessions',
    image: GuidedMeditationSessions,
    description: 'Personalized meditation sessions guided by certified instructors to help you achieve mental clarity and emotional balance.',
    duration: '60 minutes',
    audience: '1-on-1',
    tieredPricing: [
      { tier: 'Basic', price: '$10' },
      { tier: 'Premium', price: '$50' },
      { tier: 'Professional', price: '$75' },
    ],
    isVideoAvailable: true,
  },
  {
    name: 'Group Yoga Classes',
    image: GroupYogaClasses,
    description: 'Join our community yoga classes led by expert instructors. Suitable for all levels from beginners to advanced practitioners.',
    duration: '45 minutes',
    audience: 'Up to 20 people',
    tieredPricing: [
      { tier: 'Basic', price: '$20' },
      { tier: 'Premium', price: '$60' },
    ],
    isVideoAvailable: true,
  },
  {
    name: 'Wellness Consultation',
    image: WellnessConsultation,
    description: 'One-on-one consultation with our wellness experts to create a personalized health and wellness plan tailored to your needs.',
    duration: '50 minutes',
    audience: '1-on-1',
    tieredPricing: [
      { tier: 'Premium', price: '$60' },
      { tier: 'Professional', price: '$120' },
    ],
    isVideoAvailable: true,
  },
  {
    name: 'Crystal Bowl Sound Bath',
    image: CrystalBowlSoundBath,
    description: 'Experience deep relaxation and energetic cleansing through the healing vibrations of crystal singing bowls and gongs.',
    duration: '40 minutes',
    audience: 'Group',
    tieredPricing: [
      { tier: 'Professional', price: '$80' }
    ],
    isVideoAvailable: true,
  },
  {
    name: 'Reiki Energy Session',
    image: ReikiEnergySession,
    description: 'A gentle hands-on healing technique to balance your energy and promote holistic well-being.',
    duration: '60 minutes',
    audience: '1-on-1',
    tieredPricing: [
      { tier: 'Basic', price: '$45' }
    ],
    isVideoAvailable: false,
  },
  {
    name: 'Chakra Alignment Therapy',
    image: ChakraAlignmentTherapy,
    description: 'Restore harmony to your mind and body with a chakra balancing session using crystals and guided meditation.',
    duration: '50 minutes',
    audience: '1-on-1',
    tieredPricing: [
      { tier: 'Basic', price: '$40' },
      { tier: 'Professional', price: '$90' }
    ],
    isVideoAvailable: true,
  },
  {
    name: 'Aromatherapy Massage',
    image: AromatherapyMassage,
    description: 'Relax and rejuvenate with a massage using therapeutic essential oils tailored to your needs.',
    duration: '60 minutes',
    audience: '1-on-1',
    tieredPricing: [
      { tier: 'Premium', price: '$55' }
    ],
    isVideoAvailable: false,
  },
  {
    name: 'Guided Breathwork Session',
    image: GuidedBreathworkSession,
    description: 'Learn conscious breathing techniques to reduce stress, increase energy, and improve mental clarity.',
    duration: '35 minutes',
    audience: 'Group',
    tieredPricing: [
      { tier: 'Basic', price: '$20' },
      { tier: 'Premium', price: '$50' },
      { tier: 'Professional', price: '$70' }
    ],
    isVideoAvailable: true,
  },
  {
    name: 'Crystal Therapy Session',
    image: CrystalTherapySession,
    description: 'Harness the power of crystals to balance your energy and support emotional healing.',
    duration: '45 minutes',
    audience: '1-on-1',
    tieredPricing: [
      { tier: 'Basic', price: '$35' },
      { tier: 'Premium', price: '$65' }
    ],
    isVideoAvailable: false,
  },
  {
    name: 'Ayurvedic Lifestyle Consultation',
    image: AyurvedicLifestyleConsultation,
    description: 'Receive personalized guidance on diet, lifestyle, and self-care based on Ayurvedic principles.',
    duration: '60 minutes',
    audience: '1-on-1',
    tieredPricing: [
      { tier: 'Professional', price: '$100' }
    ],
    isVideoAvailable: true,
  },
  {
    name: 'Intuitive Tarot Card Reading',
    image: IntuitiveTarotCardReading,
    description: 'Gain insight and clarity on your life path with a personalized tarot card reading session.',
    duration: '30 minutes',
    audience: '1-on-1',
    tieredPricing: [
      { tier: 'Basic', price: '$25' },
      { tier: 'Professional', price: '$60' }
    ],
    isVideoAvailable: false,
  },
  {
    name: 'Qi Gong Energy Practice',
    image: QiGongEnergyPractice,
    description: 'Cultivate your life force energy and improve your health with gentle Qi Gong movements and breathwork.',
    duration: '50 minutes',
    audience: 'Group',
    tieredPricing: [
      { tier: 'Basic', price: '$30' },
      { tier: 'Premium', price: '$60' },
      { tier: 'Professional', price: '$90' }
    ],
    isVideoAvailable: true,
  },
];

const ManageServicesCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {services.map((service, index) => (
        <div key={index} className="rounded-xl overflow-hidden shadow border border-gray-200 bg-white">
          <div className="relative h-28">
            <img
              src={service.image}
              alt={service.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            {service.isVideoAvailable && (
              <div className="absolute top-2 left-4 flex items-center gap-1 text-xs text-white bg-gray-700 px-2 py-1 rounded">
                <Video size={14} className="text-white" />
                Video Available
              </div>
            )}
            <div className="absolute top-2 right-4 flex gap-2">
              <button className="text-gray-500 hover:text-red-600 bg-gray-100 rounded-md p-2" title="Delete">
                <Trash2 size={18} />
              </button>
              <button className="text-gray-500 hover:text-green-700 bg-gray-100 rounded-md p-2" title="Edit">
                <Pencil size={18} />
              </button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-800 text-sm">{service.name}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{service.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
              <span className="flex items-center gap-1"><Clock size={14} /> {service.duration}</span>
              <span className="flex items-center gap-1"><Users size={14} /> {service.audience}</span>
            </div>
            <div className="text-xs mt-3 space-y-1">
              {service.tieredPricing.map((tier, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className={`font-medium px-2 py-0.5 rounded text-xs ${tierColors[tier.tier] || "bg-gray-100 text-gray-700"}`}>
                    {tier.tier}
                  </span>
                  <span>{tier.price}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between gap-2">
              <button className="px-3 py-1 text-sm border rounded text-gray-700 hover:bg-gray-100 w-full">Preview</button>
              <button className="px-3 py-1 text-sm border rounded bg-[#213721] text-white hover:bg-green-800 w-full">Edit</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManageServicesCards