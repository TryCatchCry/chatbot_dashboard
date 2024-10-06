import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";

// Create Redux store with user reducer
const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});

export default store;
