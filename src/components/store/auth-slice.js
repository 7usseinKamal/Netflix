import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: localStorage.getItem("email"),
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
  },
  reducers: {
    loginHandler(state, action) {
      state.email = action.payload;
      if (state.email.trim().length > 0) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
        return;
      }
      localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
      localStorage.setItem("email", state.email);
    },
    logoutHandler(state) {
      state.email = "";
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("email");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
