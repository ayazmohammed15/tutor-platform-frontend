import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/register/registerSlice";
import studentRegisterReducer from "../features/register/studentRegisterSlice";
import tutorRegisterReducer from "../features/register/tutorRegisterSlice";
import courseReducer from "../features/courses/courseSlice";
import subjectReducer from "../features/subjects/subjectSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    studentRegister: studentRegisterReducer,
    tutorRegister: tutorRegisterReducer,
    courses: courseReducer,
    subjects: subjectReducer,
  },
});
