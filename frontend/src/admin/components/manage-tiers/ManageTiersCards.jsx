import React, { useEffect } from 'react'
import { CheckCircle, Pencil, Trash2 } from 'lucide-react'
import { useAdminTier } from '../../../context/admin/tier/AdminTierContext';

const tierColors = {
    Basic: "bg-indigo-100 text-indigo-800 border border-indigo-200",
    Premium: "bg-pink-100 text-pink-700 border border-pink-200",
    Professional: "bg-orange-100 text-orange-700 border border-orange-200",
  };

const ManageTiersCards = ({ onEdit }) => {
  const { tiers, tiersLoading, tiersError, fetchTiers, deleteTier } = useAdminTier();

  console.log('Rendering tiers:', tiers);

  useEffect(() => {
    fetchTiers();
  }, [fetchTiers]);

  if (tiersLoading) {
    return <div className="p-6">Loading tiers...</div>;
  }

  if (tiersError) {
    return <div className="p-6 text-red-500">{tiersError}</div>;
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tier?')) {
      try {
        await deleteTier(id);
      } catch (err) {
        alert('Failed to delete tier: ' + (err?.message || 'Unknown error'));
      }
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tiers.map((tier) => (
        <div key={tier._id} className="bg-white rounded-lg shadow-md p-6 relative border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${tierColors[tier.name] || "bg-gray-100 text-gray-700"}`}>
                {tier.name}
              </span>
            </h3>
            <div className="flex gap-2">
              <button className="text-gray-500 hover:text-green-600 p-2" title="Edit" onClick={() => onEdit(tier)}>
                  <Pencil size={18} />
              </button>
              <button className="text-gray-500 hover:text-red-600 p-2" title="Delete" onClick={() => handleDelete(tier._id)}>
                  <Trash2 size={18} />
              </button>
            </div>
          </div>
          <p className="text-xl font-bold">${tier.price}<span className="text-sm font-normal text-gray-500">/{tier.period}</span></p>
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
              {tier.isActive ? 'Active' : 'Inactive'}
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
