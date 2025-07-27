import { createContext, useContext, useState, useCallback } from 'react';
import api from '../../api/config';

export const AdminCategoryContext = createContext();

export const AdminCategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [categoriesError, setCategoriesError] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);

    const fetchCategories = useCallback(async () => {
        setCategoriesLoading(true);
        setCategoriesError(null);
        try {
            const response = await api.get('/admin/categories');
            console.log('Categories response:', response.data);
            const categoriesData = Array.isArray(response.data) ? response.data : 
                                 response.data.data ? response.data.data : [];
            setCategories(categoriesData);
        } catch (err) {
            console.error('Fetch categories error:', err);
            setCategoriesError(err.response?.data?.message || 'Failed to fetch categories');
            setCategories([]);
            throw err;
        } finally {
            setCategoriesLoading(false);
        }
    }, []);

    const getCategory = async (categoryId) => {
        try {
            const response = await api.get(`/admin/categories/${categoryId}`);
            setCurrentCategory(response.data);
            return response.data;
        } catch (err) {
            setCategoriesError(err.response?.data?.message || 'Failed to fetch category');
            throw err;
        }
    };

    const createCategory = async (categoryData) => {
        try {
            console.log('=== Category Creation Start ===');
            console.log('Input category data:', categoryData);
            
            // Send FormData directly - don't convert to JSON
            const response = await api.post('/admin/categories', categoryData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            console.log('API Response:', {
                status: response.status,
                statusText: response.statusText,
                data: response.data
            });
            
            if (!response.data) {
                console.error('No data in response');
                throw new Error('No data received from server');
            }

            const newCategory = response.data.data || response.data;
            console.log('Adding new category to state:', newCategory);
            
            setCategories(prevCategories => {
                const newCategories = [...prevCategories, newCategory];
                console.log('Updated categories state:', newCategories);
                return newCategories;
            });

            console.log('=== Category Creation Success ===');
            return newCategory;
        } catch (err) {
            console.error('=== Category Creation Error ===');
            console.error('Error details:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                stack: err.stack
            });
            throw err.response?.data || err;
        }
    };

    const updateCategory = async (categoryId, categoryData) => {
        try {
            console.log('🔵 [1] Starting Category Update');
            console.log('Category ID:', categoryId);
            console.log('Update data:', categoryData);

            // Send FormData directly - don't convert to JSON
            const response = await api.put(`/admin/categories/${categoryId}`, categoryData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            const updatedCategory = response.data.data || response.data;
            console.log('Updated category data:', updatedCategory);

            setCategories(prevCategories => {
                return prevCategories.map(category => 
                    category._id === categoryId ? updatedCategory : category
                );
            });
            
            if (currentCategory?._id === categoryId) {
                setCurrentCategory(updatedCategory);
            }
            
            console.log('🔵 [2] Category Update Complete');
            return updatedCategory;
        } catch (err) {
            console.error('❌ Category Update Error:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status
            });
            setCategoriesError(err.response?.data?.message || 'Failed to update category');
            throw err;
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            console.log('🗑️ [1] Starting Category Delete');
            console.log('Category ID:', categoryId);
            
            const response = await api.delete(`/admin/categories/${categoryId}`);
            
            setCategories(prevCategories => 
                prevCategories.filter(category => category._id !== categoryId)
            );
            
            if (currentCategory?._id === categoryId) {
                setCurrentCategory(null);
            }
            
            return response.data;
        } catch (err) {
            console.error('❌ Category Delete Error:', err);
            throw err;
        }
    };

    return (
        <AdminCategoryContext.Provider value={{
            categories,
            categoriesLoading,
            categoriesError,
            currentCategory,
            fetchCategories,
            getCategory,
            createCategory,
            updateCategory,
            deleteCategory
        }}>
            {children}
        </AdminCategoryContext.Provider>
    );
};

export const useAdminCategory = () => {
    const context = useContext(AdminCategoryContext);
    if (!context) {
        throw new Error('useAdminCategory must be used within an AdminCategoryProvider');
    }
    return context;
};

export default AdminCategoryContext;