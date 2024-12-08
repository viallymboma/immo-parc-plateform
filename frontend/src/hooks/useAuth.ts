import useSWR from 'swr';

import apiClient from '../lib/apiClient';

const fetcher = async (url: string) => {
    const response = await apiClient.get(url);
    return response.data;
};

export function useAuth() {

    const { data: user, error, mutate } = useSWR('http://localhost:5000/auth/me', fetcher, {
        // refreshInterval: 20, // Disables periodic revalidation
        refreshInterval: 0, // Disable periodic revalidation
        revalidateOnFocus: false, // Disable revalidation on window focus
        revalidateOnReconnect: false, // Disable revalidation on reconnect
    });

    console.log("uuuuuuuuuu", user)

    const login = async (phone: string, password: string) => {
        try {
            const response = await apiClient.post('/auth/login', { phone, password });
            mutate(); // Revalidate user data after login
            return response.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Login failed');
        }
    };

    const logout = async () => {
        try {
            await apiClient.post('/auth/logout');
            mutate(null); // Clear user data
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return {
        user,
        loading: !error && !user,
        error,
        login,
        logout,
    };
}
