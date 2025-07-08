import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../../api/config';
import { useAuth } from '../../auth/AuthContext';

const AdminProfileContext = createContext();

export const AdminProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    // Fetch profile on mount
    const getProfile = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get('/admin/admin-profile');
            setProfile(data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch profile');
        } finally {
            setLoading(false);
        }
    }, []);

    // Use auth context to check if user is admin before fetching
    const { user } = useAuth();
    useEffect(() => {
        if (user && user.role === 'admin') {
            getProfile();
        }
    }, [user, getProfile]);

    // Update profile (handles file upload)
    const updateProfile = async (updates) => {
        setSaving(true);
        setError(null);
        try {
            let payload = updates;
            let config = {};
            // If updating profile photo, use FormData
            if (updates.profilePhoto instanceof File) {
                payload = new FormData();
                Object.entries(updates).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        payload.append(key, value);
                    }
                });
                config.headers = { 'Content-Type': 'multipart/form-data' };
            }
            const { data } = await api.put('/admin/admin-profile', payload, config);
            setProfile(data.data); // Optimistic update
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
            return { success: false, error: err };
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminProfileContext.Provider value={{ profile, loading, error, saving, getProfile, updateProfile }}>
            {children}
        </AdminProfileContext.Provider>
    );
};

export const useAdminProfileContext = () => {
    const ctx = useContext(AdminProfileContext);
    if (!ctx) throw new Error('useAdminProfileContext must be used within an AdminProfileProvider');
    return ctx;
}; 