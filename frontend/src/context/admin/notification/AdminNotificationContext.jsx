import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../../api/config';
import { useAuth } from '../../auth/AuthContext';

const AdminNotificationContext = createContext();

export const AdminNotificationProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  // Fetch preferences
  const getPreferences = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log('[NotificationContext] Fetching notification preferences...');
    try {
      const { data } = await api.get('/admin/notification');
      console.log('[NotificationContext] Fetched preferences:', data);
      setPreferences(data.data);
    } catch (err) {
      console.error('[NotificationContext] Error fetching preferences:', err);
      setError(err.response?.data?.message || 'Failed to fetch preferences');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user && user.role === 'admin') {
      getPreferences();
    }
  }, [user, getPreferences]);

  // Update preferences
  const updatePreferences = async (updates) => {
    setSaving(true);
    setError(null);
    console.log('[NotificationContext] Updating preferences with:', updates);
    try {
      const { data } = await api.put('/admin/notification', updates);
      console.log('[NotificationContext] Updated preferences:', data);
      setPreferences(data.data);
      return { success: true };
    } catch (err) {
      console.error('[NotificationContext] Error updating preferences:', err);
      setError(err.response?.data?.message || 'Failed to update preferences');
      return { success: false, error: err };
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminNotificationContext.Provider value={{ preferences, loading, error, saving, getPreferences, updatePreferences }}>
      {children}
    </AdminNotificationContext.Provider>
  );
};

export const useAdminNotificationContext = () => {
  const ctx = useContext(AdminNotificationContext);
  if (!ctx) throw new Error('useAdminNotificationContext must be used within an AdminNotificationProvider');
  return ctx;
};
