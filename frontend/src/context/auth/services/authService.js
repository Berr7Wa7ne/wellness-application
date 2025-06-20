import api from '../../api/config';

export const authService = {
    verifyToken: async () => {
        const response = await api.get('/auth/verify');
        return response.data;
    },

    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    register: async (userData) => {
        const { adminCode, ...registrationData } = userData;
        
        // Verify admin code if provided
        if (adminCode) {
            const expectedAdminCode = import.meta.env.VITE_ADMIN_REG_CODE;
            if (adminCode !== expectedAdminCode) {
                throw new Error('Invalid admin registration code');
            }
            registrationData.role = 'admin';
        }

        const response = await api.post('/auth/register', registrationData);
        return response.data;
    }
}; 