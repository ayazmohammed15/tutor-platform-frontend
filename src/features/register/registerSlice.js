import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ======================
   COURSES
====================== */

export const fetchCourses = createAsyncThunk(
  "register/fetchCourses",
  async () => {
    const res = await api.get("/courses");
    return res.data;
  }
);

/* ======================
   BOARDS
====================== */

export const fetchBoards = createAsyncThunk(
  "register/fetchBoards",
  async () => {
    const res = await api.get("/boards");
    return res.data;
  }
);

/* ======================
   CLASSES
====================== */

export const fetchClasses = createAsyncThunk(
  "register/fetchClasses",
  async (boardId) => {
    const res = await api.get(`/classes?boardId=${boardId}`);
    return res.data;
  }
);

/* ======================
   SUBJECTS
====================== */

export const fetchSubjects = createAsyncThunk(
  "register/fetchSubjects",
  async ({ boardId, classIds }) => {
    const res = await api.post("/subjects", {
      boardId,
      classIds,
    });

    return res.data;
  }
);

const registerSlice = createSlice({
  name: "register",

  initialState: {
    courses: [],
    boards: [],
    classes: [],
    subjects: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* Courses */
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })

      /* Boards */
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
      })

      /* Classes */
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.classes = action.payload;
      })

      /* Subjects */
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload;
      });
  },
});

export default registerSlice.reducer;