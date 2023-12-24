import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  auth_data: {
    session_token: Cookies.get("session_token") || null,
    user_id: Cookies.get("user_id") || null,
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
    },

    // Logout user
    logoutUser: (state) => {
      state.auth_data.session_token = null;

      // Remove session token cookie
      Cookies.remove("session_token");

      // Remove user from local storage
      localStorage.removeItem("user_id");

      // Remove user from session storage
      sessionStorage.removeItem("user_id");

      // Remove user from cookies
      Cookies.remove("user_id");

      // Remove user from redux store
      state.auth_data.session_token = null;

      // Redirect to explore page
      window.location.href = "/explore";
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
