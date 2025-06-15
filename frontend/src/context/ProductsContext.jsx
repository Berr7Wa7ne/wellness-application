import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ProductsContext = createContext();

// Create axios instance with base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useAuth();

    // Effect to fetch products on mount only if user is authenticated
    useEffect(() => {
        if (user) {
            fetchProducts();
        } else {
            setProducts([]);
            setError(null);
        }
    }, [user]);

    // Fetch all products
    const fetchProducts = async () => {
        if (!user) return;
        
        try {
            setLoading(true);
            const response = await api.get('/products');
            setProducts(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch products');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch products by category
    const fetchProductsByCategory = async (category) => {
        try {
            setLoading(true);
            const response = await api.get(`/products/category/${category}`);
            setProducts(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch products by category');
        } finally {
            setLoading(false);
        }
    };

    // Search products
    const searchProducts = async (query) => {
        try {
            setLoading(true);
            const response = await api.get(`/products/search?q=${query}`);
            setProducts(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to search products');
        } finally {
            setLoading(false);
        }
    };

    // Get product by ID
    const getProductById = async (id) => {
        try {
            setLoading(true);
            const response = await api.get(`/products/${id}`);
            setError(null);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch product');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Filter products by price range
    const filterProductsByPrice = (minPrice, maxPrice) => {
        return products.filter(product => 
            product.price >= minPrice && product.price <= maxPrice
        );
    };

    // Sort products
    const sortProducts = (sortBy) => {
        const sortedProducts = [...products];
        switch (sortBy) {
            case 'price-asc':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }
        setProducts(sortedProducts);
    };

    // Get unique categories
    const getCategories = () => {
        const categories = products.map(product => product.category);
        return [...new Set(categories)];
    };

    // Get featured products
    const getFeaturedProducts = () => {
        return products.filter(product => product.featured);
    };

    // Get new arrivals
    const getNewArrivals = () => {
        return products
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 4);
    };

    // Get best sellers
    const getBestSellers = () => {
        return products
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 4);
    };

    // Effect to handle category changes
    useEffect(() => {
        if (selectedCategory !== 'all') {
            fetchProductsByCategory(selectedCategory);
        } else {
            fetchProducts();
        }
    }, [selectedCategory]);

    // Effect to handle search
    useEffect(() => {
        if (searchQuery) {
            searchProducts(searchQuery);
        } else if (selectedCategory === 'all') {
            fetchProducts();
        }
    }, [searchQuery]);

    const value = {
        products,
        loading,
        error,
        selectedCategory,
        searchQuery,
        setSelectedCategory,
        setSearchQuery,
        fetchProducts,
        fetchProductsByCategory,
        searchProducts,
        getProductById,
        filterProductsByPrice,
        sortProducts,
        getCategories,
        getFeaturedProducts,
        getNewArrivals,
        getBestSellers
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
}; 