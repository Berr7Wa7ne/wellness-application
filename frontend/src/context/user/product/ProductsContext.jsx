import { createContext, useContext, useState } from 'react';
import api from '../../api/config';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const [productsError, setProductsError] = useState(null);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        tier: '',
        minPrice: '',
        maxPrice: '',
        searchQuery: ''
    });

    const fetchProducts = async () => {
        setProductsLoading(true);
        setProductsError(null);
        try {
            const response = await api.get('/public/products');
            console.log('Products response:', response.data);
            
            const productsData = Array.isArray(response.data) ? response.data : 
                               response.data.data ? response.data.data : [];
            
            setProducts(productsData);
            applyFilters(productsData);
        } catch (err) {
            console.error('Fetch products error:', err);
            setProductsError(err.response?.data?.message || 'Failed to fetch products');
            setProducts([]);
            setFilteredProducts([]);
            throw err;
        } finally {
            setProductsLoading(false);
        }
    };

    const getProduct = async (id) => {
        try {
            const response = await api.get(`/public/products/${id}`);
            setCurrentProduct(response.data);
            return response.data;
        } catch (err) {
            setProductsError(err.response?.data?.message || 'Failed to fetch product');
            throw err;
        }
    };

    const applyFilters = (productsToFilter = products) => {
        let filtered = [...productsToFilter];

        // Apply category filter
        if (filters.category) {
            filtered = filtered.filter(product => product.category === filters.category);
        }

        // Apply tier filter
        if (filters.tier) {
            filtered = filtered.filter(product => product.tier === filters.tier);
        }

        // Apply price range filter
        if (filters.minPrice !== '') {
            filtered = filtered.filter(product => product.price >= Number(filters.minPrice));
        }
        if (filters.maxPrice !== '') {
            filtered = filtered.filter(product => product.price <= Number(filters.maxPrice));
        }

        // Apply search query
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            );
        }

        setFilteredProducts(filtered);
    };

    const updateFilters = (newFilters) => {
        setFilters(prev => {
            const updated = { ...prev, ...newFilters };
            applyFilters(products, updated);
            return updated;
        });
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            tier: '',
            minPrice: '',
            maxPrice: '',
            searchQuery: ''
        });
        setFilteredProducts(products);
    };

    const value = {
        products,
        filteredProducts,
        productsLoading,
        productsError,
        currentProduct,
        filters,
        fetchProducts,
        getProduct,
        updateFilters,
        clearFilters
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

export default ProductsContext; 