import { createContext, useContext, useEffect } from 'react';
import { useAuthState } from './hooks/useAuthState';
import { authService } from './services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const {
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError
  } = useAuthState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      const { user } = await authService.verifyToken();
      console.log('Token verification response:', { user });
      setUser(user);
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      console.log('Attempting login with:', { email });
      
      const { data: { user, token } } = await authService.login(email, password);
      console.log('Login response:', { user });
      
      localStorage.setItem('token', token);
      console.log('Token stored in localStorage');
      
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
      
      const { data: { user, token } } = await authService.register(userData);
      console.log('Registration response:', { user });
      
      localStorage.setItem('token', token);
      console.log('Token stored in localStorage');
      
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
    console.log('Logging out, removing token from localStorage');
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    verifyToken
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