import React, { useEffect, useState } from 'react'
import { Video, Clock, Users, Trash2, Pencil, Image } from 'lucide-react';
import { useAdminService } from '../../../context/admin/service/AdminServiceContext';
import AdminModal from '../shared/AdminModal';
import EditServiceForm from './EditServiceForm';

const tierColors = {
    Basic: "bg-indigo-100 text-indigo-800 border border-indigo-200",
    Premium: "bg-pink-100 text-pink-700 border border-pink-200",
    Professional: "bg-orange-100 text-orange-700 border border-orange-200",
};

// Default service image
const defaultServiceImage = '/images/service-placeholder.png';

const ManageServicesCards = () => {
  const { 
    services, 
    servicesLoading, 
    servicesError,
    fetchServices,
    deleteService 
  } = useAdminService();

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [editingService, setEditingService] = useState(null);
  const [serviceImages, setServiceImages] = useState([]);

  useEffect(() => {
    console.log('=== ManageServicesCards Mount ===');
    console.log('Initial services:', services);
    fetchServices().catch(error => {
      console.error('Error fetching services:', error);
    });
  }, []);

  useEffect(() => {
    console.log('🎯 [1] Services Update Triggered');
    console.log('Number of services:', services.length);
    
    const processedServices = services.map(service => {
      const imageData = {
        id: service._id,
        imageUrl: null,
        image: service.image,
        hasImageUrl: false,
        hasImageObject: false
      };

      // Check for direct imageUrl
      if (service.imageUrl) {
        imageData.imageUrl = service.imageUrl;
        imageData.hasImageUrl = true;
      }

      // Check for image object
      if (service.image?.path) {
        imageData.hasImageObject = true;
        if (!imageData.hasImageUrl) {
          imageData.imageUrl = `${import.meta.env.VITE_BACKEND_URL}/${service.image.path.replace(/\\/g, '/')}`;
        }
      }

      console.log('🎯 [2] Service Image Processing:', {
        id: imageData.id,
        hasImageUrl: imageData.hasImageUrl,
        hasImageObject: imageData.hasImageObject,
        finalUrl: imageData.imageUrl
      });

      return imageData;
    });

    setServiceImages(processedServices);
  }, [services]);

  const handleDelete = async (id) => {
    console.log('🗑️ [UI-1] Delete Initiated');
    console.log('Service ID to delete:', id);
    
    if (window.confirm('Are you sure you want to delete this service?')) {
      console.log('🗑️ [UI-2] Delete Confirmed');
      setIsDeleting(true);
      setDeleteError(null);
      
      try {
        console.log('🗑️ [UI-3] Calling Delete Service');
        await deleteService(id);
        console.log('🗑️ [UI-4] Delete Service Completed');
      } catch (error) {
        console.error('❌ Delete Error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        setDeleteError('Failed to delete service');
      } finally {
        console.log('🗑️ [UI-5] Delete Operation Finished');
        setIsDeleting(false);
      }
    } else {
      console.log('🗑️ [UI-X] Delete Cancelled');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
  };

  const handleCloseEdit = () => {
    setEditingService(null);
  };

  const handleImageError = (serviceId) => {
    console.log('🎯 [3] Image Load Error:', {
      serviceId,
      currentUrl: serviceImages.find(img => img.id === serviceId)?.imageUrl
    });
    setServiceImages(prev => 
      prev.map(img => 
        img.id === serviceId 
          ? { ...img, imageUrl: '/images/service-placeholder.png' }
          : img
      )
    );
  };

  if (servicesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#213721]"></div>
      </div>
    );
  }

  if (servicesError) {
    return (
      <div className="p-6 text-center text-red-600">
        Error loading services: {servicesError}
      </div>
    );
  }

  const servicesArray = Array.isArray(services) ? services : [];
  
  if (servicesArray.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No services found. Add your first service to get started.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {servicesArray.map((service) => {
          console.log('🎯 [4] Rendering Service:', {
            id: service._id,
            hasImageData: !!serviceImages.find(img => img.id === service._id),
            imageUrl: serviceImages.find(img => img.id === service._id)?.imageUrl
          });

          if (!service || (!service.id && !service._id)) {
            console.warn('Invalid service object:', service);
            return null;
          }

          const serviceId = service.id || service._id;
          // Use the service's imageUrl if available, otherwise use default
          const imageUrl = serviceImages.find(img => img.id === serviceId)?.imageUrl || defaultServiceImage;
          
          console.log('Service details:', {
            id: serviceId,
            title: service.title,
            imageUrl: imageUrl,
            hasImage: !!imageUrl
          });
          
          return (
            <div key={serviceId} className="rounded-xl overflow-hidden shadow border border-gray-200 bg-white">
              <div className="relative h-28">
                {imageErrors[serviceId] ? (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <Image size={24} className="text-gray-400" />
                  </div>
                ) : (
                  <img
                    src={imageUrl}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={() => handleImageError(serviceId)}
                  />
                )}
                <div className="absolute inset-0 bg-black/30" />
                {service.isVideoAvailable && (
                  <div className="absolute top-2 left-4 flex items-center gap-1 text-xs text-white bg-gray-700 px-2 py-1 rounded">
                    <Video size={14} className="text-white" />
                    Video Available
                  </div>
                )}
                <div className="absolute top-2 right-4 flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(serviceId)}
                    className="p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                    disabled={isDeleting}
                  >
                    <Trash2 size={14} />
                  </button>
                  <button 
                    onClick={() => handleEdit(service)}
                    className="p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{service.description}</p>
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {service.duration} mins
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    {service.audience}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs ${tierColors[service.tier] || 'bg-gray-100 text-gray-800'}`}>
                    {service.tier}
                  </span>
                  <span className="font-semibold text-gray-900">${service.price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AdminModal isOpen={!!editingService} onClose={handleCloseEdit}>
        {editingService && (
          <EditServiceForm
            service={editingService}
            onClose={handleCloseEdit}
          />
        )}
      </AdminModal>
    </>
  );
};

export default ManageServicesCards;