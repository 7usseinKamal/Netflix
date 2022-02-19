import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: true,
    message: "",
    authMessage: "",
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload.status;
      state.message = action.payload.message;
    },
    removeLoading(state, action) {
      state.isLoading = action.payload.status;
      state.message = action.payload.message;
    },
    showAuthFailed(state, action) {
      state.authMessage = action.payload;
    },
    resetMessage(state) {
      state.authMessage = "";
    },
  },
});

export default uiSlice;

export const uiActions = uiSlice.actions;
