import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add logging to show the API URL
console.log('API Base URL:', api.defaults.baseURL);

// Add interceptor to add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user data
      api.get('/auth/verify')
        .then(response => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      console.log('Attempting login with:', { email });
      console.log('Login URL:', `${api.defaults.baseURL}/auth/login`);
      
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      
      // The response structure is { success: true, data: { user, token } }
      const { data: { user, token } } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      return user;
    } catch (error) {
      console.error('Login error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      console.log('Attempting registration with:', { email: userData.email, role: userData.role });
      console.log('Register URL:', `${api.defaults.baseURL}/auth/register`);
      
      const { adminCode, ...registrationData } = userData;
      
      // If adminCode is provided, verify it
      if (adminCode) {
        const expectedAdminCode = import.meta.env.VITE_ADMIN_REG_CODE;
        if (adminCode !== expectedAdminCode) {
          throw new Error('Invalid admin registration code');
        }
        registrationData.role = 'admin';
      }

      const response = await api.post('/auth/register', registrationData);
      console.log('Registration response:', response.data);
      
      // The response structure is { success: true, data: { user, token } }
      const { data: { user, token } } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      return user;
    } catch (error) {
      console.error('Registration error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 