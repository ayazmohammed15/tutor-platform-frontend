import api from './api';

export const boardService = {
  getBoards: async () => {
    const response = await api.get('/boards');
    return response.data;
  },

  getClassesByBoard: async (boardId) => {
    const response = await api.get(`/boards/classes?boardId=${boardId}`);
    return response.data;
  },

  getSubjectsByClass: async (boardId, classId) => {
    const response = await api.get(
      `/boards/subjects?boardId=${boardId}&classId=${classId}`
    );
    return response.data;
  },
  getChaptersBySubject: async (subjectId) => {
    const response = await api.get(
      `/boards/chapters?subjectId=${subjectId}`
    );
    return response.data;
  },


};
