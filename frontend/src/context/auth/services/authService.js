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
        let config = {};
        let data = userData;

        // If FormData, set correct headers
        if (userData instanceof FormData) {
            config.headers = { 'Content-Type': 'multipart/form-data' };
        } else {
            // fallback for plain object (shouldn't happen after above change)
            data = { ...userData };
            if (data.adminCode) {
                const expectedAdminCode = import.meta.env.VITE_ADMIN_REG_CODE;
                if (data.adminCode !== expectedAdminCode) {
                    throw new Error('Invalid admin registration code');
                }
                data.role = 'admin';
            }
        }

        const response = await api.post('/auth/register', data, config);
        return response.data;
    }
}; 