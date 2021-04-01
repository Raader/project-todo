import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/userSlice";
import projectReducer from "../features/project/projectSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    project: projectReducer,
  },
});
