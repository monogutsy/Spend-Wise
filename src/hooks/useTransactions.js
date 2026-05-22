import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import {
  addTransaction,
  deleteTransaction,
} from "../features/transactions/transactionSlice";
import {
  selectTotalExpenses,
  selectTransactions,
} from "../features/transactions/transactionSelectors";

export function useTransactions() {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const totalExpenses = useSelector(selectTotalExpenses);

  function createTransaction(payload) {
    const parsedAmount = Number(payload.amount);

    if (
      !payload.title ||
      !payload.category ||
      !Number.isFinite(parsedAmount) ||
      parsedAmount <= 0
    ) {
      return false;
    }

    dispatch(
      addTransaction({
        id: uuid(),
        title: payload.title.trim(),
        category: payload.category,
        amount: parsedAmount,
        date:
          payload.date ||
          new Date().toISOString().slice(0, 10),
      })
    );

    return true;
  }

  function removeTransaction(id) {
    dispatch(deleteTransaction(id));
  }

  return {
    transactions,
    totalExpenses,
    createTransaction,
    removeTransaction,
  };
}
