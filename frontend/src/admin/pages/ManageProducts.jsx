import React from 'react';
import ManageProductHeader from '../components/manage-products/ManageProductHeader'
import ManageProductCards from '../components/manage-products/ManageProductCards'

const ManageProducts = () => {


  return (
    <div className="p-6">
      <ManageProductHeader />
      <ManageProductCards />
    </div>
  )
}

export default ManageProducts