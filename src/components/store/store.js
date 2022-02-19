import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import movieSlice from "./movie-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    movies: movieSlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
