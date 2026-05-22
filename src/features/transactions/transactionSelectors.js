export const selectTransactionsState = (state) =>
  state.transactions;

export const selectTransactions = (state) =>
  selectTransactionsState(state).transactions;

export const selectTotalExpenses = (state) =>
  selectTransactions(state).reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
