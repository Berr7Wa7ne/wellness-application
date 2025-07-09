import React from 'react';
import { AdminCategoryProvider } from '../../context/admin/category/AdminCategoryContext';
import { AdminVideoProvider } from '../../context/admin/video/AdminVideoContext';
import { AdminProductProvider } from '../../context/admin/product/AdminProductContext';
import { AdminServiceProvider } from '../../context/admin/service/AdminServiceContext';
import { AdminTierProvider } from '../../context/admin/tier/AdminTierContext';
import { AdminNotificationProvider } from '../../context/admin/notification/AdminNotificationContext';

export const AdminProviders = ({ children }) => (
  <AdminCategoryProvider>
    <AdminVideoProvider>
      <AdminProductProvider>
        <AdminServiceProvider>
          <AdminTierProvider>
            <AdminNotificationProvider>
              {children}
            </AdminNotificationProvider>
          </AdminTierProvider>
        </AdminServiceProvider>
      </AdminProductProvider>
    </AdminVideoProvider>
  </AdminCategoryProvider>
);

export default AdminProviders;