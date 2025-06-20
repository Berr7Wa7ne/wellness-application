import { createContext, useContext, useState, useEffect } from 'react';
import api from '../../api/config';

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        category: '',
        tier: '',
        minPrice: '',
        maxPrice: '',
        searchQuery: ''
    });
    const [filteredServices, setFilteredServices] = useState([]);

    const fetchServices = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/services');
            const servicesData = Array.isArray(response.data) ? response.data : 
                               response.data.data ? response.data.data : [];
            setServices(servicesData);
            applyFilters(servicesData);
        } catch (err) {
            console.error('Error fetching services:', err);
            setError(err.response?.data?.message || 'Failed to fetch services');
            setServices([]);
            setFilteredServices([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const applyFilters = (servicesToFilter = services) => {
        let filtered = [...servicesToFilter];

        if (filters.category) {
            filtered = filtered.filter(service => service.category === filters.category);
        }

        if (filters.tier) {
            filtered = filtered.filter(service => service.tier === filters.tier);
        }

        if (filters.minPrice !== '') {
            filtered = filtered.filter(service => service.price >= Number(filters.minPrice));
        }

        if (filters.maxPrice !== '') {
            filtered = filtered.filter(service => service.price <= Number(filters.maxPrice));
        }

        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filtered = filtered.filter(service => 
                service.name?.toLowerCase().includes(query) ||
                service.description?.toLowerCase().includes(query)
            );
        }

        setFilteredServices(filtered);
    };

    const updateFilters = (newFilters) => {
        setFilters(prev => {
            const updated = { ...prev, ...newFilters };
            applyFilters(services, updated);
            return updated;
        });
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            tier: '',
            minPrice: '',
            maxPrice: '',
            searchQuery: ''
        });
        setFilteredServices(services);
    };

    const getServiceById = (id) => {
        return services.find(service => service._id === id || service.id === id);
    };

    const value = {
        services,
        filteredServices,
        loading,
        error,
        filters,
        fetchServices,
        updateFilters,
        clearFilters,
        getServiceById
    };

    return (
        <ServicesContext.Provider value={value}>
            {children}
        </ServicesContext.Provider>
    );
};

export const useServices = () => {
    const context = useContext(ServicesContext);
    if (!context) {
        throw new Error('useServices must be used within a ServicesProvider');
    }
    return context;
};

export default ServicesContext; 