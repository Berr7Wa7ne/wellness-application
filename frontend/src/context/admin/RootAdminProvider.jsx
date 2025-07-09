import React from 'react';
import { AdminProfileProvider } from './settings/AdminProfileContext';
import { AdminProductProvider } from './product/AdminProductContext';
import { AdminServiceProvider } from './service/AdminServiceContext';
import { AdminCategoryProvider } from './category/AdminCategoryContext';
import { AdminVideoProvider } from './video/AdminVideoContext';
import { AdminNotificationProvider } from './notification/AdminNotificationContext';

export const RootAdminProvider = ({ children }) => {
    return (
        <AdminProfileProvider>
            <AdminNotificationProvider>
                <AdminCategoryProvider>
                    <AdminVideoProvider>
                    <AdminProductProvider>
                        <AdminServiceProvider>
                            {children}
                        </AdminServiceProvider>
                    </AdminProductProvider>
                </AdminVideoProvider>
            </AdminCategoryProvider>
            </AdminNotificationProvider>
        </AdminProfileProvider>
    );
};

export default RootAdminProvider; 