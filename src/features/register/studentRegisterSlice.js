import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";

export const registerStudent = createAsyncThunk(
  "studentRegister",
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.register(payload);
    } catch (error) {
      const responseData = error.response?.data;
      return rejectWithValue(
        responseData?.message ||
          responseData?.error ||
          (typeof responseData === "string" ? responseData : "Student registration failed")
      );
    }
  }
);

const studentRegisterSlice = createSlice({
  name: "studentRegister",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(registerStudent.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(registerStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRegisterState } = studentRegisterSlice.actions;

export default studentRegisterSlice.reducer;
