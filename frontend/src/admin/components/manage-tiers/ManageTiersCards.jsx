import React from 'react'
import { CheckCircle, Pencil, Trash2 } from 'lucide-react'

const tierColors = {
    Basic: "bg-indigo-100 text-indigo-800 border border-indigo-200",
    Premium: "bg-pink-100 text-pink-700 border border-pink-200",
    Professional: "bg-orange-100 text-orange-700 border border-orange-200",
  };

const tiers = [
  {
    tier: "Basic",
    price: "$9.99",
    period: "month",
    features: [
      "Access to basic videos",
      "Email support",
      "Monthly newsletter"
    ],
    active: true
  },
  {
    tier: "Premium",
    price: "$19.99",
    period: "month",
    features: [
      "All Basic tier features",
      "Advanced meditation videos",
      "Weekly live sessions",
      "Priority support"
    ],
    active: true
  },
  {
    tier: "Professional",
    price: "$29.99",
    period: "month",
    features: [
      "All Premium tier features",
      "Exclusive workshops",
      "Personal coaching sessions",
      "24/7 support",
      "License to use for clients"
    ],
    active: true
  }
]

const ManageTiersCards = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tiers.map((tier, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 relative border border-gray-200">
        <div className="absolute top-2 right-4 flex gap-2">
        <button className="text-gray-500 hover:text-green-600 p-2" title="Edit">
            <Pencil size={18} />
        </button>
        <button className="text-gray-500 hover:text-red-600 p-2" title="Delete">
            <Trash2 size={18} />
        </button>
        </div>
        <h3 className="text-lg font-semibold mb-2">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${tierColors[tier.tier] || "bg-gray-100 text-gray-700"}`}>
            {tier.tier}
        </span>
        </h3>
          <p className="text-xl font-bold">{tier.price}<span className="text-sm font-normal text-gray-500">/{tier.period}</span></p>
          <ul className="mt-4 mb-4 space-y-2">
            {tier.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-700">
                <CheckCircle size={16} className="text-green-600 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-green-600 text-sm">
              <span className="h-2 w-2 bg-green-600 rounded-full mr-1"></span>
              Active
            </span>
            <button className="text-sm font-medium text-primary border border-gray-300 px-4 py-1 rounded-md hover:bg-gray-100 transition">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ManageTiersCards
