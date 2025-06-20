import { createContext, useContext, useState } from 'react';
import api from '../../api/config';

const AdminServiceContext = createContext();

export const AdminServiceProvider = ({ children }) => {
    const [services, setServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(false);
    const [servicesError, setServicesError] = useState(null);
    const [currentService, setCurrentService] = useState(null);

    const fetchServices = async () => {
        setServicesLoading(true);
        setServicesError(null);
        try {
            const response = await api.get('/admin/services');
            console.log('Services response:', response.data);
            
            const servicesData = Array.isArray(response.data) ? response.data : 
                               response.data.data ? response.data.data : [];
            
            setServices(servicesData);
        } catch (err) {
            console.error('Fetch services error:', err);
            setServicesError(err.response?.data?.message || 'Failed to fetch services');
            setServices([]);
            throw err;
        } finally {
            setServicesLoading(false);
        }
    };

    const getService = async (id) => {
        try {
            const response = await api.get(`/admin/services/${id}`);
            setCurrentService(response.data);
            return response.data;
        } catch (err) {
            setServicesError(err.response?.data?.message || 'Failed to fetch service');
            throw err;
        }
    };

    const createService = async (serviceData) => {
        try {
            console.log('=== Service Creation Start ===');
            console.log('Input service data contents:');
            for (let pair of serviceData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            
            const response = await api.post('/admin/services', serviceData, config);
            console.log('API Response:', {
                status: response.status,
                statusText: response.statusText,
                data: response.data,
                headers: response.headers
            });
            
            if (!response.data) {
                console.error('No data in response');
                throw new Error('No data received from server');
            }

            const newService = response.data.data || response.data;
            console.log('Adding new service to state:', newService);
            
            setServices(prevServices => {
                const newServices = [...prevServices, newService];
                console.log('Updated services state:', newServices);
                return newServices;
            });

            console.log('=== Service Creation Success ===');
            return newService;
        } catch (err) {
            console.error('=== Service Creation Error ===');
            console.error('Error details:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                stack: err.stack
            });
            throw err.response?.data || err;
        }
    };

    const updateService = async (serviceId, formData) => {
        console.log('🔵 [1] Starting Service Update');
        console.log('Service ID:', serviceId);
        
        const cleanFormData = new FormData();
        
        try {
            let hasImage = false;
            console.log('🔵 [2] Processing Form Data');
            for (let [key, value] of formData.entries()) {
                if (key === 'image' && value instanceof File) {
                    hasImage = true;
                    console.log('📸 Image detected:', {
                        name: value.name,
                        type: value.type,
                        size: value.size
                    });
                    cleanFormData.append('image', value);
                    continue;
                }
                cleanFormData.append(key, value);
            }

            console.log('🔵 [3] Sending Request');
            const response = await api.put(`/admin/services/${serviceId}`, cleanFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                maxBodyLength: Infinity,
                maxContentLength: Infinity,
                timeout: 60000
            });

            console.log('🔵 [4] Response Received');
            const updatedService = response.data.data;
            console.log('📸 Image in response:', {
                hasImageObject: !!updatedService.image,
                imagePath: updatedService.image?.path,
                currentImageUrl: updatedService.imageUrl
            });

            setServices(prevServices => {
                console.log('🔵 [5] Updating Service State');
                return prevServices.map(service => {
                    if (service._id === serviceId) {
                        if (updatedService.image?.path) {
                            const fullImageUrl = `${import.meta.env.VITE_BACKEND_URL}/${updatedService.image.path.replace(/\\/g, '/')}`;
                            updatedService.imageUrl = fullImageUrl;
                            console.log('📸 Constructed image URL:', {
                                path: updatedService.image.path,
                                fullUrl: fullImageUrl
                            });
                        } else {
                            console.log('⚠️ No image path in updated service');
                        }
                        return updatedService;
                    }
                    return service;
                });
            });

            console.log('🔵 [6] Update Complete');
            return response.data;
        } catch (error) {
            console.error('❌ Service Update Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update service';
            const errorDetails = error.response?.data?.errors || error.response?.data || null;

            throw {
                message: errorMessage,
                details: errorDetails,
                originalError: error
            };
        }
    };

    const deleteService = async (id) => {
        console.log('🗑️ [1] Starting Service Delete');
        console.log('Service ID:', id);
        
        try {
            console.log('🗑️ [2] Sending Delete Request');
            const response = await api.delete(`/admin/services/${id}`);
            console.log('🗑️ [3] Delete Response:', response.data);
            
            console.log('🗑️ [4] Updating Local State');
            setServices(prevServices => {
                const updatedServices = prevServices.filter(service => service._id !== id);
                console.log('Services after deletion:', updatedServices);
                return updatedServices;
            });
            
            if (currentService?._id === id) {
                console.log('🗑️ [5] Clearing Current Service');
                setCurrentService(null);
            }
            
            console.log('🗑️ [6] Service Delete Complete');
        } catch (err) {
            console.error('❌ Service Delete Error:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status
            });
            setServicesError(err.response?.data?.message || 'Failed to delete service');
            throw err;
        }
    };

    const value = {
        services,
        servicesLoading,
        servicesError,
        currentService,
        fetchServices,
        getService,
        createService,
        updateService,
        deleteService
    };

    return (
        <AdminServiceContext.Provider value={value}>
            {children}
        </AdminServiceContext.Provider>
    );
};

export const useAdminService = () => {
    const context = useContext(AdminServiceContext);
    if (!context) {
        throw new Error('useAdminService must be used within an AdminServiceProvider');
    }
    return context;
};

export default AdminServiceContext; 