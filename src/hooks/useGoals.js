import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import {
  addGoal,
  deleteGoal,
} from "../features/goals/goalSlice";
import { selectGoals } from "../features/goals/goalSelectors";

export function useGoals() {
  const dispatch = useDispatch();
  const goals = useSelector(selectGoals);

  function createGoal(payload) {
    const parsedTarget = Number(payload.targetAmount);
    const parsedCurrent = Number(
      payload.currentAmount || 0
    );

    if (
      !payload.name ||
      !Number.isFinite(parsedTarget) ||
      parsedTarget <= 0
    ) {
      return false;
    }

    dispatch(
      addGoal({
        id: uuid(),
        name: payload.name.trim(),
        targetAmount: parsedTarget,
        currentAmount:
          Number.isFinite(parsedCurrent) &&
          parsedCurrent >= 0
            ? parsedCurrent
            : 0,
      })
    );

    return true;
  }

  function removeGoal(id) {
    dispatch(deleteGoal(id));
  }

  return {
    goals,
    createGoal,
    removeGoal,
  };
}
