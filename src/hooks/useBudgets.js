import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import {
  addBudget,
  deleteBudget,
} from "../features/budgets/budgetSlice";
import { selectBudgets } from "../features/budgets/budgetSelectors";

export function useBudgets() {
  const dispatch = useDispatch();
  const budgets = useSelector(selectBudgets);

  function createBudget(payload) {
    const parsedLimit = Number(payload.limit);
    const parsedSpent = Number(payload.spent || 0);

    if (
      !payload.category ||
      !Number.isFinite(parsedLimit) ||
      parsedLimit <= 0
    ) {
      return false;
    }

    dispatch(
      addBudget({
        id: uuid(),
        category: payload.category,
        limit: parsedLimit,
        spent:
          Number.isFinite(parsedSpent) && parsedSpent >= 0
            ? parsedSpent
            : 0,
      })
    );

    return true;
  }

  function removeBudget(id) {
    dispatch(deleteBudget(id));
  }

  return {
    budgets,
    createBudget,
    removeBudget,
  };
}
