/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { authService, extractAuthUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 2. Initialize navigate

  useEffect(() => {
    const initAuth = async () => {
      const currentUser = authService.getCurrentUser();

      if (!currentUser) {
        setLoading(false);
        return;
      }

      setUser(currentUser);

      try {
        const response = await authService.getProfile();
        const profileUser = extractAuthUser(response);

        if (profileUser) {
          setUser(profileUser);
          localStorage.setItem('user', JSON.stringify(profileUser));
        }
      } catch (error) {
        console.error('Failed to refresh auth profile:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    const loggedInUser = extractAuthUser(response);

    if (response.success && loggedInUser) {
      setUser(loggedInUser);
    }
    return response;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    const registeredUser = extractAuthUser(response);

    if (response.success && registeredUser) {
      setUser(registeredUser);
    }
    return response;
  };

  const logout = () => {
    // 3. Clear data and redirect
    authService.logout();
    setUser(null);
    navigate('/login'); // Redirects the user immediately to the login page
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
