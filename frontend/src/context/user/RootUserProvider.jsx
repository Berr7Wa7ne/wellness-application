import React from 'react';
import { ProductsProvider } from './product/ProductsContext';
import { ServicesProvider } from './service/ServicesContext';
import { CartProvider } from './cart/CartContext';

export const RootUserProvider = ({ children }) => {
    return (
        <ProductsProvider>
            <ServicesProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </ServicesProvider>
        </ProductsProvider>
    );
};

export default RootUserProvider; 