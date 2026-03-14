import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const registerStudent = createAsyncThunk(
  "studentRegister",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register/student", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Student registration failed"
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