import React from 'react';
import { AuthProvider } from './auth/AuthContext';
import { RootUserProvider } from './user/RootUserProvider';
import { RootAdminProvider } from './admin/RootAdminProvider';

export const RootProvider = ({ children }) => {
    return (
        <AuthProvider>
            <RootAdminProvider>
                <RootUserProvider>
                    {children}
                </RootUserProvider>
            </RootAdminProvider>
        </AuthProvider>
    );
};

export default RootProvider; 