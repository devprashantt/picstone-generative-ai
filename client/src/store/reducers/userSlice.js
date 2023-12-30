import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  auth_data: {
    session_token: Cookies.get("session_token") || null,
    user_id: Cookies.get("user_id") || null,
  },
  user_data: {
    name: "",
    email: "",
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
      // Set user id from payload
      state.auth_data.user_id = action.payload.user_id;

      // Set name
      state.user_data.name = action.payload.name;
      // Set email
      state.user_data.email = action.payload.email;
    },

    // Logout user
    logoutUserState: (state) => {
      // Remove session id from cookies
      Cookies.remove("session_token");

      // Set user state as null
      state.auth_data.session_token = null;
    },
  },
});

export const { setUser, logoutUserState } = userSlice.actions;

export default userSlice.reducer;
