import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const completeTutorRegistration = createAsyncThunk(
  "/tutorRegistration",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/auth/complete-registration",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Tutor registration failed" }
      );
    }
  }
);

const tutorRegisterSlice = createSlice({
  name: "tutorRegister",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetTutorRegisterState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(completeTutorRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(completeTutorRegistration.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(completeTutorRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTutorRegisterState } = tutorRegisterSlice.actions;

export default tutorRegisterSlice.reducer;