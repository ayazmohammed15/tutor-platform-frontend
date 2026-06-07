import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/admin/subjects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createSubject = createAsyncThunk(
  "subjects/createSubject",
  async (subjectData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/admin/subjects",
        subjectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchCourseSubjects = createAsyncThunk(
  "subjects/fetchCourseSubjects",
  async (courseId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        `/admin/course-subjects?courseId=${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const saveCourseSubjects = createAsyncThunk(
  "subjects/saveCourseSubjects",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/admin/course-subjects",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const subjectSlice = createSlice({
  name: "subjects",
  initialState: {
    subjects: [],
    selectedSubjects: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload;
      })

      .addCase(fetchCourseSubjects.fulfilled, (state, action) => {
        state.selectedSubjects = action.payload;
      });
  },
});

export default subjectSlice.reducer;