import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_CATEGORIES } from "../../utils/constants";

const initialState = {
  categories: [...DEFAULT_CATEGORIES],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },

    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category !== action.payload
      );
    },
  },
});

export const { addCategory, deleteCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
