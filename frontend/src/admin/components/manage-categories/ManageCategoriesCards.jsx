import React, { useState, useContext, useEffect } from 'react';
import { MoreHorizontal, AudioLines, BookOpenCheck, Video, FlaskConical, ShieldCheck, HeartHandshake, Edit, Trash2 } from 'lucide-react';
import { AdminCategoryContext } from '../../../context/admin/category/AdminCategoryContext';
import AdminModal from '../shared/AdminModal';
import AddCategoryForm from './AddCategoryForm';

const ManageCategoriesCards = () => {
  const { categories, fetchCategories, deleteCategory } = useContext(AdminCategoryContext);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showMenu, setShowMenu] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowMenu(null);
  };

  const handleDelete = async (category) => {
    if (window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
      try {
        await deleteCategory(category._id);
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
    setShowMenu(null);
  };

  const handleCloseEdit = () => {
    setEditingCategory(null);
  };

  const toggleMenu = (categoryId) => {
    setShowMenu(showMenu === categoryId ? null : categoryId);
  };

  // Helper function to get icon based on type
  const getIconForType = (type) => {
    switch (type) {
      case 'Products':
        return <FlaskConical className="w-5 h-5" />;
      case 'Videos':
        return <Video className="w-5 h-5" />;
      case 'Audio':
        return <AudioLines className="w-5 h-5" />;
      case 'Services':
        return <ShieldCheck className="w-5 h-5" />;
      default:
        return <BookOpenCheck className="w-5 h-5" />;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between min-h-[140px]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg p-2" style={{ backgroundColor: category.backgroundColor, color: category.textColor }}>
                  {getIconForType(category.type)}
                </div>
                <div>
                  <span
                    className="px-2 py-0.5 text-base font-medium rounded"
                      style={{
                        backgroundColor: category.backgroundColor,
                        color: category.textColor
                        }}
                        >
                        {category.name}
                  </span>
                  <p className="text-xs text-gray-400">{category.type}</p>
                </div>
              </div>
              <div className="relative">
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => toggleMenu(category._id)}
                >
                  <MoreHorizontal size={20} />
                </button>
                
                {showMenu === category._id && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                    <button
                      onClick={() => handleEdit(category)}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {category.description}
            </div>
            <div className="flex justify-between items-end mt-4">
              <div className="text-xs text-gray-400">Items</div>
              <div className={`text-sm font-semibold ${category.textColor}`}>
                {category.items || 0}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <AdminModal isOpen={!!editingCategory} onClose={handleCloseEdit}>
        {editingCategory && (
          <AddCategoryForm
            editingCategory={editingCategory}
            onClose={handleCloseEdit}
          />
        )}
      </AdminModal>
    </>
  );
};

export default ManageCategoriesCards;