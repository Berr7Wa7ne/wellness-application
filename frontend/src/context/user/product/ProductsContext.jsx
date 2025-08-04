import { createContext, useContext, useState, useCallback, useRef } from 'react';
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

    // Use refs to access current values without causing re-renders
    const productsRef = useRef([]);
    const filtersRef = useRef(filters);

    // Update refs when state changes
    productsRef.current = products;
    filtersRef.current = filters;

    const applyFilters = useCallback((productsToFilter, filtersToApply) => {
        const targetProducts = productsToFilter || productsRef.current;
        const targetFilters = filtersToApply || filtersRef.current;
        
        let filtered = [...targetProducts];

        // Apply category filter
        if (targetFilters.category) {
            filtered = filtered.filter(product => product.category === targetFilters.category);
        }

        // Apply tier filter
        if (targetFilters.tier) {
            filtered = filtered.filter(product => product.tier === targetFilters.tier);
        }

        // Apply price range filter
        if (targetFilters.minPrice !== '') {
            filtered = filtered.filter(product => {
                const price = typeof product.price === 'string' ? 
                    parseFloat(product.price.replace('$', '')) : product.price;
                return price >= Number(targetFilters.minPrice);
            });
        }
        if (targetFilters.maxPrice !== '') {
            filtered = filtered.filter(product => {
                const price = typeof product.price === 'string' ? 
                    parseFloat(product.price.replace('$', '')) : product.price;
                return price <= Number(targetFilters.maxPrice);
            });
        }

        // Apply search query
        if (targetFilters.searchQuery) {
            const query = targetFilters.searchQuery.toLowerCase();
            filtered = filtered.filter(product => 
                product.name?.toLowerCase().includes(query) ||
                product.description?.toLowerCase().includes(query)
            );
        }

        setFilteredProducts(filtered);
    }, []); // No dependencies to avoid circular updates

    const fetchProducts = useCallback(async () => {
        // Prevent multiple simultaneous calls
        if (productsLoading) {
            return;
        }

        setProductsLoading(true);
        setProductsError(null);
        
        try {
            const response = await api.get('/public/products');
            console.log('Products response:', response.data);
            
            const productsData = Array.isArray(response.data) ? response.data : 
                               response.data.data ? response.data.data : [];
            
            setProducts(productsData);
            // Apply filters after setting products
            setTimeout(() => applyFilters(productsData, filtersRef.current), 0);
        } catch (err) {
            console.error('Fetch products error:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch products';
            setProductsError(errorMessage);
            setProducts([]);
            setFilteredProducts([]);
        } finally {
            setProductsLoading(false);
        }
    }, [productsLoading, applyFilters]);

    const getProduct = useCallback(async (id) => {
        try {
            const response = await api.get(`/public/products/${id}`);
            setCurrentProduct(response.data);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch product';
            setProductsError(errorMessage);
            throw err;
        }
    }, []);

    const updateFilters = useCallback((newFilters) => {
        const updatedFilters = { ...filtersRef.current, ...newFilters };
        setFilters(updatedFilters);
        // Use setTimeout to break the synchronous update cycle
        setTimeout(() => applyFilters(productsRef.current, updatedFilters), 0);
    }, [applyFilters]);

    const clearFilters = useCallback(() => {
        const clearedFilters = {
            category: '',
            tier: '',
            minPrice: '',
            maxPrice: '',
            searchQuery: ''
        };
        setFilters(clearedFilters);
        setTimeout(() => setFilteredProducts(productsRef.current), 0);
    }, []);

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