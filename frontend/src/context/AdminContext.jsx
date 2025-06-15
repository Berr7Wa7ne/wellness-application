import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AdminContext = createContext();

// Create axios instance with base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalServices: 0,
    totalOrders: 0,
    totalUsers: 0
  });

  useEffect(() => {
    if (user) {
      checkAdminStatus();
      fetchAdminStats();
    } else {
      setIsAdmin(false);
      setLoading(false);
    }
  }, [user]);

  const checkAdminStatus = async () => {
    try {
      const response = await api.get('/admin/check');
      setIsAdmin(response.data.isAdmin);
    } catch (err) {
      setIsAdmin(false);
      console.error('Admin check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminStats = async () => {
    if (!isAdmin) return;
    
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch admin stats');
    }
  };

  const createProduct = async (productData) => {
    try {
      const response = await api.post('/admin/products', productData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
      throw err;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await api.put(`/admin/products/${id}`, productData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/admin/products/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
      throw err;
    }
  };

  const createService = async (serviceData) => {
    try {
      const response = await api.post('/admin/services', serviceData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create service');
      throw err;
    }
  };

  const updateService = async (id, serviceData) => {
    try {
      const response = await api.put(`/admin/services/${id}`, serviceData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update service');
      throw err;
    }
  };

  const deleteService = async (id) => {
    try {
      await api.delete(`/admin/services/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete service');
      throw err;
    }
  };

  const value = {
    isAdmin,
    loading,
    error,
    stats,
    fetchAdminStats,
    createProduct,
    updateProduct,
    deleteProduct,
    createService,
    updateService,
    deleteService
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}; 