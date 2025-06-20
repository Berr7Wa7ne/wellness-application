import { createContext, useContext, useState } from 'react';
import api from '../../api/config';

const AdminProductContext = createContext();

export const AdminProductProvider = ({ children }) => {
    // Product management state
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const [productsError, setProductsError] = useState(null);
    const [currentProduct, setCurrentProduct] = useState(null);

    const fetchProducts = async () => {
        setProductsLoading(true);
        setProductsError(null);
        try {
            const response = await api.get('/admin/products');
            setProducts(response.data);
        } catch (err) {
            setProductsError(err.response?.data?.message || 'Failed to fetch products');
            throw err;
        } finally {
            setProductsLoading(false);
        }
    };

    const getProduct = async (id) => {
        try {
            const response = await api.get(`/admin/products/${id}`);
            setCurrentProduct(response.data);
            return response.data;
        } catch (err) {
            setProductsError(err.response?.data?.message || 'Failed to fetch product');
            throw err;
        }
    };

    const createProduct = async (productData) => {
        try {
            console.log('=== Product Creation Start ===');
            
            // Log FormData contents for debugging
            console.log('Input product data contents:');
            for (let pair of productData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            
            // Set the correct content type for file upload
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            
            const response = await api.post('/admin/products', productData, config);
            console.log('API Response:', {
                status: response.status,
                statusText: response.statusText,
                data: response.data,
                headers: response.headers
            });
            
            if (!response.data) {
                console.error('No data in response');
                throw new Error('No data received from server');
            }

            // Extract the actual product data from the response
            const newProduct = response.data.data || response.data;
            console.log('Adding new product to state:', newProduct);
            
            setProducts(prevProducts => {
                const newProducts = [...prevProducts, newProduct];
                console.log('Updated products state:', newProducts);
                return newProducts;
            });

            console.log('=== Product Creation Success ===');
            return newProduct;
        } catch (err) {
            console.error('=== Product Creation Error ===');
            console.error('Error details:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                stack: err.stack
            });
            throw err.response?.data || err;
        }
    };

    const updateProduct = async (id, productData) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            const response = await api.put(`/admin/products/${id}`, productData, config);
            
            setProducts(prevProducts => 
                prevProducts.map(product => 
                    product._id === id ? response.data : product
                )
            );
            
            if (currentProduct?._id === id) {
                setCurrentProduct(response.data);
            }
            
            return response.data;
        } catch (err) {
            setProductsError(err.response?.data?.message || 'Failed to update product');
            throw err;
        }
    };

    const deleteProduct = async (id) => {
        try {
            await api.delete(`/admin/products/${id}`);
            setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
            if (currentProduct?._id === id) {
                setCurrentProduct(null);
            }
        } catch (err) {
            setProductsError(err.response?.data?.message || 'Failed to delete product');
            throw err;
        }
    };

    const value = {
        products,
        productsLoading,
        productsError,
        currentProduct,
        fetchProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct
    };

    return (
        <AdminProductContext.Provider value={value}>
            {children}
        </AdminProductContext.Provider>
    );
};

export const useAdminProduct = () => {
    const context = useContext(AdminProductContext);
    if (!context) {
        throw new Error('useAdminProduct must be used within an AdminProductProvider');
    }
    return context;
};

export default AdminProductContext; 