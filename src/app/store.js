import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/register/registerSlice";
import { registerStudent } from "../features/register/studentRegisterSlice";
import tutorRegisterReducer from "../features/register/tutorRegisterSlice";


export const store = configureStore({
  reducer: {
    register: registerReducer,
    studentRegister: registerStudent, // ← ADD THIS
     tutorRegister: tutorRegisterReducer,
  },
});