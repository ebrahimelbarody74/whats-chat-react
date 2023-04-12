import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/authSlice";
const store = configureStore({
  reducer: {
    form: dataSlice,
  },
});

export default store;
