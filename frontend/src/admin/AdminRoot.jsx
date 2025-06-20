import React from 'react';
import AdminProviders from './providers/AdminProviders';
import AdminRoutes from './routes/AdminRoutes';

const AdminRoot = () => (
  <AdminProviders>
    <AdminRoutes />
  </AdminProviders>
);

export default AdminRoot;