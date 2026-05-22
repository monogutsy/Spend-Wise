export const selectBillsState = (state) =>
  state.bills;

export const selectBills = (state) =>
  selectBillsState(state).bills;
