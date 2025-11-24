/**
 * services/api.js
 * Centralized place for making HTTP requests to the backend.
 * Uses 'axios' library for cleaner syntax than fetch.
 */

import axios from 'axios';

// Create an axios instance with base URL
// In production (Vercel), we use the env variable. In dev, we can rely on the proxy or fallback.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Interceptor to add the JWT token to every request
// This runs before every request is sent
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// --- Auth API calls ---

export const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await api.post('/auth/login', userData);
    return response.data;
};

export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

// --- Score API calls ---

// --- Score API calls ---

export const saveScore = async (wpm, accuracy, mode, duration) => {
    const response = await api.post('/score', { wpm, accuracy, mode, duration });
    return response.data;
};

export const getScoreHistory = async () => {
    const response = await api.get('/score/history');
    return response.data;
};

export default api;
