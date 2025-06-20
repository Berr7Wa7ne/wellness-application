import { createContext, useContext, useState, useEffect } from 'react';
import api from '../../api/config';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCartItems(parsedCart);
                calculateTotal(parsedCart);
            } catch (err) {
                console.error('Failed to parse saved cart:', err);
                localStorage.removeItem('cart');
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        calculateTotal(cartItems);
    }, [cartItems]);

    const calculateTotal = (items) => {
        const newTotal = items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        setTotal(newTotal);
    };

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => 
                i._id === item._id && i.type === item.type
            );

            if (existingItem) {
                return prevItems.map(i => 
                    i._id === item._id && i.type === item.type
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }

            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId, type) => {
        setCartItems(prevItems => 
            prevItems.filter(item => !(item._id === itemId && item.type === type))
        );
    };

    const updateQuantity = (itemId, type, quantity) => {
        if (quantity < 1) {
            removeFromCart(itemId, type);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === itemId && item.type === type
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    const checkout = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/orders', { items: cartItems });
            clearCart();
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
        checkout
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