import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../../api/config';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const [isUpdating, setIsUpdating] = useState(false);

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

    // Separate function for refreshing cart without affecting loading state
    const refreshCart = useCallback(async () => {
        setIsUpdating(true);
        setError(null);
        try {
            const response = await api.get('/public/carts');
            const cartData = response.data.data;
            setCartItems(cartData.items || []);
            setTotal(cartData.total || 0);
        } catch (err) {
            console.error('Failed to refresh cart:', err);
            setError(err.response?.data?.message || 'Failed to refresh cart');
        } finally {
            setIsUpdating(false);
        }
    }, []);

    useEffect(() => {
        // Only fetch cart if user is authenticated
        const token = localStorage.getItem('token');
        if (token) {
            fetchCart();
        }
    }, [fetchCart]);

    // Optimistic update function
    const updateCartOptimistically = (newItems, newTotal) => {
        setCartItems(newItems);
        setTotal(newTotal);
    };

    const addToCart = async (productId, quantity = 1) => {
        const token = localStorage.getItem('token');
        if (!token) {
            const error = new Error('Please log in to add items to your cart');
            error.response = { status: 401, data: { message: 'Authentication required' } };
            throw error;
        }

        setIsUpdating(true);
        setError(null);
        
        // Optimistic update
        const existingItemIndex = cartItems.findIndex(item => 
            item.product?._id === productId || item.productId === productId
        );
        
        let optimisticItems = [...cartItems];
        let optimisticTotal = total;
        
        if (existingItemIndex >= 0) {
            // Update existing item
            optimisticItems[existingItemIndex] = {
                ...optimisticItems[existingItemIndex],
                quantity: optimisticItems[existingItemIndex].quantity + quantity
            };
            optimisticTotal += (optimisticItems[existingItemIndex].product?.price || 0) * quantity;
        } else {
            // Add new item (we'll need to fetch the product details)
            const newItem = {
                id: `temp-${Date.now()}`,
                productId,
                quantity,
                product: { price: 0 } // Temporary placeholder
            };
            optimisticItems.push(newItem);
        }
        
        updateCartOptimistically(optimisticItems, optimisticTotal);

        try {
            const response = await api.post('/public/carts/items', {
                productId,
                quantity
            });
            const cartData = response.data.data;
            setCartItems(cartData.items || []);
            setTotal(cartData.total || 0);
            
            return { success: true, data: cartData };
        } catch (err) {
            // Revert optimistic update on error
            refreshCart();
            setError(err.response?.data?.message || 'Failed to add item to cart');
            throw err;
        } finally {
            setIsUpdating(false);
        }
    };

    const removeFromCart = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            const error = new Error('Please log in to manage your cart');
            error.response = { status: 401, data: { message: 'Authentication required' } };
            throw error;
        }

        setIsUpdating(true);
        setError(null);
        
        // Optimistic update
        const itemToRemove = cartItems.find(item => 
            item.product?._id === productId || item.productId === productId
        );
        const optimisticItems = cartItems.filter(item => 
            item.product?._id !== productId && item.productId !== productId
        );
        const optimisticTotal = total - ((itemToRemove?.product?.price || 0) * (itemToRemove?.quantity || 0));
        
        updateCartOptimistically(optimisticItems, optimisticTotal);

        try {
            const response = await api.delete(`/public/carts/items/${productId}`);
            const cartData = response.data.data;
            setCartItems(cartData.items || []);
            setTotal(cartData.total || 0);
        } catch (err) {
            // Revert optimistic update on error
            refreshCart();
            setError(err.response?.data?.message || 'Failed to remove item from cart');
            throw err;
        } finally {
            setIsUpdating(false);
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

        setIsUpdating(true);
        setError(null);
        
        // Optimistic update
        const itemIndex = cartItems.findIndex(item => 
            item.product?._id === productId || item.productId === productId
        );
        
        if (itemIndex >= 0) {
            const item = cartItems[itemIndex];
            const oldTotal = (item.product?.price || 0) * item.quantity;
            const newTotal = (item.product?.price || 0) * quantity;
            const totalDifference = newTotal - oldTotal;
            
            const optimisticItems = [...cartItems];
            optimisticItems[itemIndex] = {
                ...item,
                quantity
            };
            
            const optimisticTotal = total + totalDifference;
            updateCartOptimistically(optimisticItems, optimisticTotal);
        }

        try {
            const response = await api.put(`/public/carts/items/${productId}`, {
                quantity
            });
            const cartData = response.data.data;
            setCartItems(cartData.items || []);
            setTotal(cartData.total || 0);
        } catch (err) {
            // Revert optimistic update on error
            refreshCart();
            setError(err.response?.data?.message || 'Failed to update cart item');
            throw err;
        } finally {
            setIsUpdating(false);
        }
    };

    const clearCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            const error = new Error('Please log in to manage your cart');
            error.response = { status: 401, data: { message: 'Authentication required' } };
            throw error;
        }

        setIsUpdating(true);
        setError(null);
        
        // Optimistic update
        updateCartOptimistically([], 0);

        try {
            await api.delete('/public/carts');
            setCartItems([]);
            setTotal(0);
        } catch (err) {
            // Revert optimistic update on error
            refreshCart();
            setError(err.response?.data?.message || 'Failed to clear cart');
            throw err;
        } finally {
            setIsUpdating(false);
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
        isUpdating,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
        fetchCart,
        refreshCart
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