import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout'; // Admin layout: sidebar, topbar, etc.
import Dashboard from '../pages/Dashboard';
import ManageVideos from '../pages/ManageVideos';
import ManageProducts from '../pages/ManageProducts';
import ManageServices from '../pages/ManageServices';
import ManageTiers from '../pages/ManageTiers';
import ManageCategories from '../pages/ManageCategories';

const AdminRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="" element={<Dashboard />} />
      <Route path="videos" element={<ManageVideos />} />
      <Route path="products" element={<ManageProducts />} />
      <Route path="services" element={<ManageServices />} />
      <Route path="tiers" element={<ManageTiers />} />
      <Route path="categories" element={<ManageCategories />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
