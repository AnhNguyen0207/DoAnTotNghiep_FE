import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import titleReducer from "./titleSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    title: titleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }),
});
