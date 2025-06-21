import { createContext, useContext, useState, useCallback } from 'react';
import api from '../../api/config';

const AdminTierContext = createContext();

export const AdminTierProvider = ({ children }) => {
    const [tiers, setTiers] = useState([]);
    const [tiersLoading, setTiersLoading] = useState(false);
    const [tiersError, setTiersError] = useState(null);
    const [currentTier, setCurrentTier] = useState(null);

    // Fetch all tiers
    // const fetchTiers = async () => {
    //     setTiersLoading(true);
    //     setTiersError(null);
    //     try {
    //         const response = await api.get('/admin/tiers');
    //         setTiers(Array.isArray(response.data.data) ? response.data.data : []);
    //     } catch (err) {
    //         setTiersError(err.response?.data?.message || 'Failed to fetch tiers');
    //         throw err;
    //     } finally {
    //         setTiersLoading(false);
    //     }
    // };

    const fetchTiers = useCallback(async () => {
        setTiersLoading(true);
        setTiersError(null);
        try {
            const response = await api.get('/admin/tiers');
            console.log('Fetched tiers response:', response.data);
            setTiers(Array.isArray(response.data.data) ? response.data.data : []);
            console.log('Tiers after fetchTiers:', Array.isArray(response.data.data) ? response.data.data : []);
        } catch (err) {
            setTiersError(err.response?.data?.message || 'Failed to fetch tiers');
            throw err;
        } finally {
            setTiersLoading(false);
        }
      }, []);

    // Get a single tier by ID
    const getTier = async (id) => {
        try {
            const response = await api.get(`/admin/tiers/tier/${id}`);
            setCurrentTier(response.data.data);
            return response.data.data;
        } catch (err) {
            setTiersError(err.response?.data?.message || 'Failed to fetch tier');
            throw err;
        }
    };

    // Create a new tier
    const createTier = async (formData) => {
        try {
            // Map frontend field names to backend
            const payload = {
                name: formData.tierName,
                price: parseFloat(formData.price),
                period: formData.period,
                features: formData.features,
                isActive: formData.isActive
            };
            const response = await api.post('/admin/tiers', payload);
            const newTier = response.data.data || response.data;
            console.log('Created tier:', newTier);
            await fetchTiers();
            console.log('Tiers after createTier:', tiers);
            return newTier;
        } catch (err) {
            setTiersError(err.response?.data?.message || 'Failed to create tier');
            throw err;
        }
    };

    // Update a tier
    const updateTier = async (id, formData) => {
        try {
            const payload = {
                name: formData.tierName,
                price: parseFloat(formData.price),
                period: formData.period,
                features: formData.features,
                isActive: formData.isActive
            };
            await api.put(`/admin/tiers/tier/${id}`, payload);
            await fetchTiers();
            console.log('Tiers after updateTier:', tiers);
            return true;
        } catch (err) {
            setTiersError(err.response?.data?.message || 'Failed to update tier');
            throw err;
        }
    };

    // Delete a tier
    const deleteTier = async (id) => {
        try {
            await api.delete(`/admin/tiers/tier/${id}`);
            await fetchTiers();
            console.log('Tiers after deleteTier:', tiers);
            if (currentTier?._id === id) {
                setCurrentTier(null);
            }
        } catch (err) {
            setTiersError(err.response?.data?.message || 'Failed to delete tier');
            throw err;
        }
    };

    const value = {
        tiers,
        tiersLoading,
        tiersError,
        currentTier,
        fetchTiers,
        getTier,
        createTier,
        updateTier,
        deleteTier
    };

    return (
        <AdminTierContext.Provider value={value}>
            {children}
        </AdminTierContext.Provider>
    );
};

export const useAdminTier = () => {
    const context = useContext(AdminTierContext);
    if (!context) {
        throw new Error('useAdminTier must be used within an AdminTierProvider');
    }
    return context;
};

export default AdminTierContext;
