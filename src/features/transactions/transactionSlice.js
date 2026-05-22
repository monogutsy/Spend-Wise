import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [
    {
      id: 1,
      title: "Jollibee",
      category: "Food",
      amount: 250,
      date: "2026-05-22",
    },
    {
      id: 2,
      title: "Electric Bill",
      category: "Bills",
      amount: 1200,
      date: "2026-05-21",
    },
  ],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },

    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
  },
});

export const { addTransaction, deleteTransaction } =
  transactionSlice.actions;

export default transactionSlice.reducer;