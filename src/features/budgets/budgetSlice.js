import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budgets: [
    {
      id: "budget-food",
      category: "Food",
      limit: 300,
      spent: 0,
    },
    {
      id: "budget-bills",
      category: "Bills",
      limit: 1000,
      spent: 0,
    },
  ],
};

const budgetSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    addBudget: (state, action) => {
      state.budgets.push(action.payload);
    },

    deleteBudget: (state, action) => {
      state.budgets = state.budgets.filter(
        (budget) => budget.id !== action.payload
      );
    },
  },
});

export const { addBudget, deleteBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
