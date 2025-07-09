import React, { useState, useContext, useEffect } from 'react';
import { MoreHorizontal, Edit, Trash2, DollarSign, Package, Star } from 'lucide-react';
import { useAdminProduct } from '../../../context/admin/product/AdminProductContext';
import AdminModal from '../shared/AdminModal';
import AddProductForm from './AddProductForm';
import { useAdminTier } from '../../../context/admin/tier/AdminTierContext';

const ManageProductsCards = () => {
  const { products, fetchProducts, deleteProduct } = useAdminProduct();
  const { tiers, fetchTiers } = useAdminTier();
  const [editingProduct, setEditingProduct] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchTiers()]).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    console.log('Products:', products);
  }, [products]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowMenu(null);
  };

  const handleDelete = async (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        await deleteProduct(product._id);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
    setShowMenu(null);
  };

  const handleCloseEdit = () => {
    setEditingProduct(null);
  };

  const toggleMenu = (productId) => {
    setShowMenu(showMenu === productId ? null : productId);
  };

  // Helper function to get tier badge styling
  const getTierBadge = (product) => {
    const defaultBg = '#E8F5E9';
    const defaultText = '#66BB6A';
    
    const bgColor = product.backgroundColor || defaultBg;
    const textColor = product.textColor || defaultText;

    return (
      <span
        className="px-2 py-0.5 text-xs font-semibold rounded"
        style={{
          backgroundColor: bgColor,
          color: textColor
        }}
      >
        {product.tier}
      </span>
    );
  };

  // Helper function to get category badge styling
  const getCategoryBadge = (category) => {
    const categoryColors = {
      'Magickal Oils': { bg: '#FFE4E1', text: '#FF6B6B' },
      'Meditation Videos': { bg: '#E0F2F1', text: '#26A69A' },
      'Licenses': { bg: '#E8F5E9', text: '#66BB6A' },
      'Audio Guides': { bg: '#FFF3E0', text: '#FFA726' },
      'Healing Tools': { bg: '#E3F2FD', text: '#42A5F5' },
      'Books & Journals': { bg: '#F3E5F5', text: '#AB47BC' }
    };

    const colors = categoryColors[category] || { bg: '#FAFAFA', text: '#9E9E9E' };

    return (
      <span
        className="px-2 py-0.5 text-xs font-medium rounded"
        style={{
          backgroundColor: colors.bg,
          color: colors.text
        }}
      >
        {category}
      </span>
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <>
      <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {products.map((product) => (
          <div
            key={product._id || product.name}
            className="rounded-xl overflow-hidden shadow border border-gray-100"
          >
            <div className="h-32 flex items-center justify-center bg-gray-100">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="h-full object-contain" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-200">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${(() => {
                  const categoryColors = {
                    'Magickal Oils': "bg-[#FFE4E1] text-[#FF6B6B]",
                    'Meditation Videos': "bg-[#E0F2F1] text-[#26A69A]",
                    'Licenses': "bg-[#E8F5E9] text-[#66BB6A]",
                    'Audio Guides': "bg-[#FFF3E0] text-[#FFA726]",
                    'Healing Tools': "bg-[#E3F2FD] text-[#42A5F5]",
                    'Books & Journals': "bg-[#F3E5F5] text-[#AB47BC]"
                  };
                  return categoryColors[product.category] || "bg-gray-200 text-gray-800";
                })()}`}>
                  {product.category}
                </span>
                <div className="relative">
                  <button
                    className="text-gray-500 hover:text-gray-700 text-sm"
                    onClick={() => toggleMenu(product._id)}
                  >
                    ⋮
                  </button>
                  {showMenu === product._id && (
                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                      <button
                        onClick={() => handleEdit(product)}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <h3 className="font-medium text-gray-800 text-sm">{product.name}</h3>
              <div className="flex justify-between items-center my-2">
                <p className="text-sm text-gray-600 mt-1">${product.price}</p>
                {/* Dynamic Tier Badge */}
                {(() => {
                  const tierObj = tiers.find(t => t._id === product.tier || t.name === product.tier);
                  if (tierObj) {
                    return (
                      <span
                        className="px-2 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: tierObj.backgroundColor, color: tierObj.textColor }}
                      >
                        {tierObj.name}
                      </span>
                    );
                  } else {
                    return (
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                        {typeof product.tier === 'string' && product.tier.length < 20 ? product.tier : 'Unknown Tier'}
                      </span>
                    );
                  }
                })()}
              </div>
              <p className="text-xs text-gray-400 mt-1">Stock: {product.stock}</p>
              <p className="text-sm text-gray-500 line-clamp-2 mt-2">{product.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <AdminModal isOpen={!!editingProduct} onClose={handleCloseEdit}>
        {editingProduct && (
          <AddProductForm
            editingProduct={editingProduct}
            onClose={handleCloseEdit}
          />
        )}
      </AdminModal>
    </>
  );
};

export default ManageProductsCards; 