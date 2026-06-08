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

const decodeJwtPayload = (token) => {
  try {
    const payload = token.split('.')[1];

    if (!payload) {
      return null;
    }

    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(normalizedPayload)
        .split('')
        .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

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
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      return null;
    }

    try {
      const user = JSON.parse(userStr);
      const tokenPayload = decodeJwtPayload(token);
      const tokenRole = tokenPayload?.role || tokenPayload?.data?.role;

      if (tokenRole && user?.role && tokenRole !== user.role) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return null;
      }

      return user;
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export { extractAuthUser };
