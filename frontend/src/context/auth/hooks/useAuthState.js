import { useState } from 'react';

export const useAuthState = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return {
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError
    };
}; 