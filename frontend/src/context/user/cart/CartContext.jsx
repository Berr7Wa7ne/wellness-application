import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../../api/config';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);

    // Load cart from API on mount
    const fetchCart = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/public/carts');
            const cartData = response.data.data;
            setCartItems(cartData.items || []);
            setTotal(cartData.total || 0);
        } catch (err) {
            console.error('Failed to fetch cart:', err);
            setError(err.response?.data?.message || 'Failed to load cart');
            // If user is not authenticated, cart will be empty
            if (err.response?.status !== 401) {
                setCartItems([]);
                setTotal(0);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Only fetch cart if user is authenticated
        const token = localStorage.getItem('token');
        if (token) {
            fetchCart();
        }
    }, [fetchCart]);

    const addToCart = async (productId, quantity = 1) => {
        const token = localStorage.getItem('token');
        if (!token) {
            const error = new Error('Please log in to add items to your cart');
            error.response = { status: 401, data: { message: 'Authentication required' } };
            throw error;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/public/carts/items', {
                productId,
                quantity
            });
            const cartData = response.data.data;
            setCartItems(cartData.items || []);
            setTotal(cartData.total || 0);
            
            // Return success for UI feedback
            return { success: true, data: cartData };
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add item to cart');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            const error = new Error('Please log in to manage your cart');
            error.response = { status: 401, data: { message: 'Authentication required' } };
            throw error;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await api.delete(`/public/carts/items/${productId}`);
            const cartData = response.data.data;
            setCartItems(cartData.items || []);
            setTotal(cartData.total || 0);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to remove item from cart');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        const token = localStorage.getItem('token');
        if (!token) {
            const error = new Error('Please log in to manage your cart');
            error.response = { status: 401, data: { message: 'Authentication required' } };
            throw error;
        }

        if (quantity < 1) {
            await removeFromCart(productId);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await api.put(`/public/carts/items/${productId}`, {
                quantity
            });
            const cartData = response.data.data;
            setCartItems(cartData.items || []);
            setTotal(cartData.total || 0);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update cart item');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            const error = new Error('Please log in to manage your cart');
            error.response = { status: 401, data: { message: 'Authentication required' } };
            throw error;
        }

        setLoading(true);
        setError(null);
        try {
            await api.delete('/public/carts');
            setCartItems([]);
            setTotal(0);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to clear cart');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const checkout = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            const error = new Error('Please log in to checkout');
            error.response = { status: 401, data: { message: 'Authentication required' } };
            throw error;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/orders', { items: cartItems });
            await clearCart();
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Checkout failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        cartItems,
        loading,
        error,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
        fetchCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext; 