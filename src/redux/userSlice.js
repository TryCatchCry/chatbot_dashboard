// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  email: null, // Will hold the user's email
  password: null, // Will hold the user's password (not recommended in production)
  userLoggedIn: false, // Tracks login status
  photoURL: null,
  displayName: null, // New property to store user's Google avatar
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      // Save the email, password, and photoURL when the user logs in
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.userLoggedIn = true; // Mark the user as logged in
      state.photoURL = action.payload.photoURL ? action.payload.photoURL : null;
      state.displayName = action.payload.displayName;
    },
    logout: (state) => {
      // Reset the state when the user logs out
      state.email = null;
      state.password = null;
      state.userLoggedIn = false;
      state.photoURL = null;
      state.displayName = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
