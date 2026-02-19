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

    if (filters.board_id) params.append('board_id', filters.board_id);
    if (filters.class_id) params.append('class_id', filters.class_id);
    if (filters.subject_id) params.append('subject_id', filters.subject_id);
    if (filters.chapter_id) params.append('chapter_id', filters.chapter_id);

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

  sendRegistrationInvite: (data) =>
    api.post("/admin/send-tutor-invite", data),

  getPendingTutors: () =>
    api.get("/admin/pending-tutors"),

  approveTutor: (id) =>
    api.put(`/admin/approve/${id}`),

  rejectTutor: (id) =>
    api.put(`/admin/reject/${id}`)

};
