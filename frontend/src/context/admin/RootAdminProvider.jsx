import React from 'react';
import { AdminProductProvider } from './product/AdminProductContext';
import { AdminServiceProvider } from './service/AdminServiceContext';
import { AdminCategoryProvider } from './category/AdminCategoryContext';
import { AdminVideoProvider } from './video/AdminVideoContext';

export const RootAdminProvider = ({ children }) => {
    return (
        <AdminCategoryProvider>
            <AdminVideoProvider>
                <AdminProductProvider>
                    <AdminServiceProvider>
                        {children}
                    </AdminServiceProvider>
                </AdminProductProvider>
            </AdminVideoProvider>
        </AdminCategoryProvider>
    );
};

export default RootAdminProvider; 