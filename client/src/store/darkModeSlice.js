import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
  },
  reducers: {
    toogle_darkMode(state, action) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode);
    },
  },
});

export const { toogle_darkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
