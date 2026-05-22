import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goals: [
    {
      id: "goal-emergency",
      name: "Emergency Fund",
      targetAmount: 100000,
      currentAmount: 35000,
    },
    {
      id: "goal-laptop",
      name: "Laptop Upgrade",
      targetAmount: 80000,
      currentAmount: 12000,
    },
  ],
};

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal: (state, action) => {
      state.goals.push(action.payload);
    },

    deleteGoal: (state, action) => {
      state.goals = state.goals.filter(
        (goal) => goal.id !== action.payload
      );
    },
  },
});

export const { addGoal, deleteGoal } = goalSlice.actions;

export default goalSlice.reducer;
