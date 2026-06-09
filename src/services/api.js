import axios from 'axios';
import toast from 'react-hot-toast';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
export const UPLOADS_BASE_URL = import.meta.env.VITE_UPLOADS_BASE_URL || API_BASE_URL.replace(/\/api\/?$/, '/uploads');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const requestUrl = error.config?.url || '';
    const isLoginRequest = requestUrl.includes('/auth/login');
    const skipAuthRedirect = error.config?.skipAuthRedirect;
    const suppressGlobalError = error.config?.suppressGlobalError;

    if (error.response?.status === 401 && !isLoginRequest && !skipAuthRedirect) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    if (!suppressGlobalError) {
      const message = error.response?.data?.message || error.message || 'An error occurred';
      if (!isLoginRequest) {
        toast.error(message);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
