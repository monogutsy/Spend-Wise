import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  currency: "PHP",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },

    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { toggleDarkMode, setCurrency } =
  settingsSlice.actions;

export default settingsSlice.reducer;