export const selectGoalsState = (state) =>
  state.goals;

export const selectGoals = (state) =>
  selectGoalsState(state).goals;
