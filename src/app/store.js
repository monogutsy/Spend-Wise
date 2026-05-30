import { configureStore } from "@reduxjs/toolkit";

import transactionReducer from "../features/transactions/transactionSlice";
import budgetReducer from "../features/budgets/budgetSlice";
import goalReducer from "../features/goals/goalSlice";
import billsReducer from "../features/bills/billsSlice";
import categoryReducer from "../features/categories/categorySlice";
import settingsReducer from "../features/settings/settingsSlice";
import authReducer from "../features/auth/authSlice";
import {
  createDebouncedStateSaver,
  loadState,
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

const persistState =
  createDebouncedStateSaver();

store.subscribe(() => {
  const state = store.getState();

  persistState({
    transactions: state.transactions,
    budgets: state.budgets,
    goals: state.goals,
    bills: state.bills,
    categories: state.categories,
    settings: state.settings,
  });
});
