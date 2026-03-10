import api from "./api";

export const boardService = {
  getCourses: async () => {
    const response = await api.get("/courses");
    return response.data;
  },
  getBoards: async () => {
    const response = await api.get("/boards");
    return response.data;
  },

  /* GET CLASSES BY BOARD */
  getClassesByBoard: async (boardId) => {
    const response = await api.get(`/classes?boardId=${boardId}`);
    return response.data;
  },

  /* GET SUBJECTS BY BOARD + CLASSES */
  getSubjectsByClasses: async (boardId, classIds) => {
    const response = await api.post(
      `/subjects`,
      {
        boardId,
        classIds
      }
    );
    return response.data;
  },

  /* GET CHAPTERS */
  getChaptersBySubject: async (subjectId) => {
    const response = await api.get(
      `/chapters?subjectId=${subjectId}`
    );
    return response.data;
  }

};