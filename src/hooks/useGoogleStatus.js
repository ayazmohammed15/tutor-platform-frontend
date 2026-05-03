import { useCallback, useEffect, useState } from 'react';
import api from '../services/api';

const getErrorMessage = (error) => {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return 'Unable to check Google Calendar connection status.';
};

export const useGoogleStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('You need to log in again before connecting Google Calendar.');
      }

      const response = await api.get('/tutors/google-status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        skipAuthRedirect: true,
        suppressGlobalError: true,
      });
      const payload = response.data;

      if (!payload?.success) {
        throw new Error(payload?.message || 'Google Calendar status check failed.');
      }

      setIsConnected(Boolean(payload.isConnected));
    } catch (err) {
      setIsConnected(false);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    const handleFocus = () => {
      fetchStatus();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchStatus]);

  return {
    isConnected,
    loading,
    error,
    refetch: fetchStatus,
  };
};

export default useGoogleStatus;
