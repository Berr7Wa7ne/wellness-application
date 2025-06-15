import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

// Create axios instance with base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    // Fetch cart on mount only if user is authenticated
    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart([]);
            setError(null);
        }
    }, [user]);

    const fetchCart = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const response = await api.get('/carts');
            setCart(response.data || []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch cart');
            setCart([]);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            setError(null);
            const response = await api.post('/cart', { productId, quantity });
            setCart(response.data || []);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add item to cart');
            throw err;
        }
    };

    const updateCartItem = async (productId, quantity) => {
        try {
            setError(null);
            const response = await api.put(`/cart/${productId}`, { quantity });
            setCart(response.data || []);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update cart item');
            throw err;
        }
    };

    const removeFromCart = async (productId) => {
        try {
            setError(null);
            const response = await api.delete(`/cart/${productId}`);
            setCart(response.data || []);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to remove item from cart');
            throw err;
        }
    };

    const clearCart = async () => {
        try {
            setError(null);
            await api.delete('/cart');
            setCart([]);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to clear cart');
            throw err;
        }
    };

    // Calculate cart totals safely
    const calculateCartTotal = () => {
        if (!Array.isArray(cart)) return 0;
        return cart.reduce((total, item) => {
            const itemPrice = item.price || 0;
            const itemQuantity = item.quantity || 0;
            return total + (itemPrice * itemQuantity);
        }, 0);
    };

    const calculateCartCount = () => {
        if (!Array.isArray(cart)) return 0;
        return cart.reduce((count, item) => {
            const itemQuantity = item.quantity || 0;
            return count + itemQuantity;
        }, 0);
    };

    const value = {
        cart: cart || [],
        loading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        cartTotal: calculateCartTotal(),
        cartCount: calculateCartCount()
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}; 