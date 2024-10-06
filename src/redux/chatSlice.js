import { createSlice } from "@reduxjs/toolkit";

// Create a slice for chat messages
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [], // Initialize messages as an empty array
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload); // Add new message to the messages array
    },
  },
});

// Export the action to add messages
export const { addMessage } = chatSlice.actions;

// Export the reducer to be used in the store
export default chatSlice.reducer;
