import React from 'react';
import { useCategories } from '../../context/user/category/CategoryContext';

const Categories = () => {
  const { categories, loading, error } = useCategories();

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div
            key={cat._id}
            className={`p-6 rounded shadow ${cat.backgroundColor} ${cat.textColor}`}
          >
            <h2 className="text-xl font-semibold">{cat.name}</h2>
            <p>{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories; 