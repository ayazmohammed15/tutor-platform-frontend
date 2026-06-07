import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../services/api";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    return response.data;
  }
);

export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (courseData, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_BASE_URL}/admin/courses`,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await dispatch(fetchCourses());

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create course"
      );
    }
  }
);
export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ id, courseData }, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API_BASE_URL}/admin/courses/${id}`,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await dispatch(fetchCourses());

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update course"
      );
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch courses";
      })
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
      })

      .addCase(createCourse.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateCourse.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default courseSlice.reducer;