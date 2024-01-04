import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeName: "newYear",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, actions) => {
      state.themeName = actions.payload.themeName;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
