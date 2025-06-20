import React from 'react';
import { AdminCategoryProvider } from '../../context/admin/category/AdminCategoryContext';
import { AdminVideoProvider } from '../../context/admin/video/AdminVideoContext';
import { AdminProductProvider } from '../../context/admin/product/AdminProductContext';
import { AdminServiceProvider } from '../../context/admin/service/AdminServiceContext';

export const AdminProviders = ({ children }) => (
  <AdminCategoryProvider>
    <AdminVideoProvider>
      <AdminProductProvider>
        <AdminServiceProvider>
          {children}
        </AdminServiceProvider>
      </AdminProductProvider>
    </AdminVideoProvider>
  </AdminCategoryProvider>
);

export default AdminProviders;