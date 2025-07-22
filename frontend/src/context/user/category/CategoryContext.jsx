import { createContext, useContext, useState, useEffect } from 'react';
import api from '../../api/config';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/public/categories')
      .then(res => {
        console.log('Fetched categories:', res.data.data); // <-- Add this
        setCategories(res.data.data);
      })
      .catch(err => setError('Failed to fetch categories'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext); 