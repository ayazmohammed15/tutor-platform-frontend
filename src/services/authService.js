import api from './api';

const extractAuthUser = (payload) => {
  if (payload?.data?.user) {
    return payload.data.user;
  }

  if (payload?.user) {
    return payload.user;
  }

  if (payload?.data?.role) {
    return payload.data;
  }

  if (payload?.role) {
    return payload;
  }

  return null;
};

const extractAuthToken = (payload) => {
  if (payload?.data?.token) {
    return payload.data.token;
  }

  if (payload?.token) {
    return payload.token;
  }

  return null;
};

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  registerSchoolStudent: async (userData) => {
    const response = await api.post('/auth/register/school', userData);
    return response.data;
  },

  registerEngineeringStudent: async (userData) => {
    const response = await api.post('/auth/register/engineering', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.success) {
      const user = extractAuthUser(response.data);
      const token = extractAuthToken(response.data);

      if (token) {
        localStorage.setItem('token', token);
      }

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (updates) => {
    const response = await api.put('/auth/profile', updates);
    return response.data;
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export { extractAuthUser };
