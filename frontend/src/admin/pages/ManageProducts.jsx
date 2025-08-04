import React, { useState } from 'react';
import ManageProductHeader from '../components/manage-products/ManageProductHeader'
import ManageProductsCards from '../components/manage-products/ManageProductsCards'

const ManageProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div>
      <ManageProductHeader 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ManageProductsCards selectedCategory={selectedCategory} />
    </div>
  )
}

export default ManageProducts