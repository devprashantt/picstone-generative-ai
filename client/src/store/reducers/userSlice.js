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
      state.auth_data.session_token = null;

      // Remove session token cookie
      Cookies.remove("session_token");

      // Remove user from local storage
      localStorage.removeItem("user");

      // Remove user from session storage
      sessionStorage.removeItem("user");

      // Remove user from cookies
      Cookies.remove("user");

      // Remove user from redux store
      state.auth_data.session_token = null;

      // Redirect to explore page
      window.location.href = "/explore";
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
