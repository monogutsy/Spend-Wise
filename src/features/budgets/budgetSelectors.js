export const selectBudgetsState = (state) =>
  state.budgets;

export const selectBudgets = (state) =>
  selectBudgetsState(state).budgets;
