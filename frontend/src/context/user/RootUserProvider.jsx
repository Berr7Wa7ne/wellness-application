import React from 'react';
import { ProductsProvider } from './product/ProductsContext';
import { ServicesProvider } from './service/ServicesContext';
import { CartProvider } from './cart/CartContext';
import { CategoryProvider } from './category/CategoryContext';


export const RootUserProvider = ({ children }) => {
    return (
        <ProductsProvider>
            <ServicesProvider>
                <CartProvider>
                    <CategoryProvider>
                        {children}
                    </CategoryProvider>
                </CartProvider>
            </ServicesProvider>
        </ProductsProvider>
    );
};

export default RootUserProvider; 