import api from './api';

export const sessionService = {
  createSessionRequest: async (requestData) => {
    const response = await api.post('/sessions/requests', requestData);
    return response.data;
  },

  getMyRequests: async () => {
    const response = await api.get('/sessions/requests/my');
    return response.data;
  },

  getPendingRequests: async () => {
    const response = await api.get('/sessions/requests/pending');
    return response.data;
  },

  acceptRequest: async (requestId) => {
    const response = await api.put(`/sessions/requests/${requestId}/accept`);
    return response.data;
  },

  rejectRequest: async (requestId) => {
    const response = await api.put(`/sessions/requests/${requestId}/reject`);
    return response.data;
  },

  suggestAlternateDate: async (requestId, dates) => {
    const response = await api.put(`/sessions/requests/${requestId}/suggest`, dates);
    return response.data;
  },

  getMySessions: async () => {
    const response = await api.get('/sessions');
    return response.data;
  },

  getSessionDetails: async (sessionId) => {
    const response = await api.get(`/sessions/${sessionId}`);
    return response.data;
  },
};

export const availabilityService = {
  createSlot: async (slotData) => {
    const response = await api.post('/availability', slotData);
    return response.data;
  },

  getMySlots: async () => {
    const response = await api.get('/availability/my-slots');
    return response.data;
  },

  getTutorSlots: async (tutorId) => {
    const response = await api.get(`/availability/tutor/${tutorId}`);
    return response.data;
  },
  getAvailableSlotsByDate: async (tutorId, date) => {
    const response = await api.get(
      `/availability/tutor/${tutorId}/date/${date}`
    );
    return response.data;
  },

  updateSlot: async (slotId, updates) => {
    const response = await api.put(`/availability/${slotId}`, updates);
    return response.data;
  },

  deleteSlot: async (slotId) => {
    const response = await api.delete(`/availability/${slotId}`);
    return response.data;
  },
};
