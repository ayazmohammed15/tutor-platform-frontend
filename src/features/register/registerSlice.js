import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Fetch Courses
export const fetchCourses = createAsyncThunk(
  "/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/courses");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch courses");
    }
  }
);

// Fetch Classes
export const fetchClasses = createAsyncThunk(
  "/fetchClasses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/classes");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch classes");
    }
  }
);

// Fetch All Subjects
export const fetchSubjects = createAsyncThunk(
  "/fetchSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/subjects");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch subjects");
    }
  }
);

// Fetch Subjects by Course
export const fetchSubjectsByCourse = createAsyncThunk(
  "/fetchSubjectsByCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/subjects-by-course?courseId=${courseId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch subjects");
    }
  }
);

export const fetchCoursesBySubject = createAsyncThunk(
  "/fetchCoursesBySubject",
  async (subjectId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/courses-by-subject?subjectId=${subjectId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch courses");
    }
  }
);

const masterDataSlice = createSlice({
  name: "register",
  initialState: {
    courses: [],
    classes: [],
    subjects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // COURSES
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CLASSES
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ALL SUBJECTS
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SUBJECTS BY COURSE
      .addCase(fetchSubjectsByCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjectsByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjectsByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCoursesBySubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoursesBySubject.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCoursesBySubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default masterDataSlice.reducer;
