import { configureStore } from "@reduxjs/toolkit";

import transactionReducer from "../features/transactions/transactionSlice";
import budgetReducer from "../features/budgets/budgetSlice";
import goalReducer from "../features/goals/goalSlice";
import billsReducer from "../features/bills/billsSlice";
import categoryReducer from "../features/categories/categorySlice";
import settingsReducer from "../features/settings/settingsSlice";
import authReducer from "../features/auth/authSlice";
import {
  loadState,
  saveState,
} from "../services/localStorageService";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    budgets: budgetReducer,
    goals: goalReducer,
    bills: billsReducer,
    categories: categoryReducer,
    settings: settingsReducer,
    auth: authReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();

  saveState({
    transactions: state.transactions,
    budgets: state.budgets,
    goals: state.goals,
    bills: state.bills,
    categories: state.categories,
    settings: state.settings,
  });
});
