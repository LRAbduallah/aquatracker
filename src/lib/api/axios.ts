import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth
api.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      const method = (error.config?.method || '').toLowerCase();
      // Only redirect to login for non-GET requests (mutations)
      if (method && method !== 'get') {
        if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
      // For GET requests, do not redirect; allow caller to handle 401
    }
    return Promise.reject(error);
  }
);