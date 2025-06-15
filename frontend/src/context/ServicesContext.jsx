import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ServicesContext = createContext();

// Create axios instance with base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tiers, setTiers] = useState([]);
  const { user } = useAuth();

  // Fetch services and tiers on mount only if user is authenticated
  useEffect(() => {
    if (user) {
      fetchServices();
      fetchTiers();
    } else {
      setServices([]);
      setTiers([]);
      setError(null);
    }
  }, [user]);

  const fetchServices = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await api.get('/services');
      setServices(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch services');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTiers = async () => {
    if (!user) return;

    try {
      const response = await api.get('/tiers');
      setTiers(response.data);
    } catch (err) {
      console.error('Failed to fetch tiers:', err);
      setTiers([]);
    }
  };

  const getServiceById = async (id) => {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch service');
      throw err;
    }
  };

  const getServicesByCategory = async (categoryId) => {
    try {
      const response = await api.get(`/services/category/${categoryId}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch services by category');
      throw err;
    }
  };

  const value = {
    services,
    tiers,
    loading,
    error,
    fetchServices,
    getServiceById,
    getServicesByCategory
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
}; 