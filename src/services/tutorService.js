import api from './api';

export const tutorService = {
  createProfile: async (profileData) => {
    const response = await api.post('/tutors/profile', profileData);
    return response.data;
  },

  getMyProfile: async () => {
    const response = await api.get('/tutors/profile/me');
    return response.data;
  },

  updateProfile: async (updates) => {
    const response = await api.put('/tutors/profile', updates);
    return response.data;
  },

  searchTutors: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.class_name) params.append('class_name', filters.class_name);
    if (filters.chapter_name) params.append('chapter_name', filters.chapter_name);
    if (filters.topic_name) params.append('topic_name', filters.topic_name);

    const response = await api.get(`/tutors/search?${params.toString()}`);
    return response.data;
  },

  getTutorDetails: async (tutorId) => {
    const response = await api.get(`/tutors/${tutorId}`);
    return response.data;
  },

  getPendingTutors: async () => {
    const response = await api.get('/tutors/pending');
    return response.data;
  },

  approveTutor: async (tutorId) => {
    const response = await api.put(`/tutors/${tutorId}/approve`);
    return response.data;
  },

  rejectTutor: async (tutorId) => {
    const response = await api.put(`/tutors/${tutorId}/reject`);
    return response.data;
  },
};
