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

  getSubjectsByClasses: async (boardId, classIds) => {
    const response = await api.post(
      `/boards/subjects`,
      {
        boardId,
        classIds
      }
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
