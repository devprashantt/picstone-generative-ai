import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  auth_data: {
    session_token: Cookies.get("session_token") || null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user
    setUser: (state, action) => {
      // Set user session token from payload
      state.auth_data.session_token = action.payload.session_token;
    },

    // Logout user
    logoutUser: (state) => {
      state.user = {};
      localStorage.removeItem("user");
    },
    // Add other reducers here
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
