import { createSelector } from "@reduxjs/toolkit";
import {
  differenceInCalendarDays,
  format,
  parseISO,
  startOfToday,
} from "date-fns";

import { selectBudgets } from "../budgets/budgetSelectors";
import { selectBills } from "../bills/billsSelectors";
import { selectGoals } from "../goals/goalSelectors";
import { selectTransactions } from "../transactions/transactionSelectors";

const selectCategoryTotalsMap = createSelector(
  [selectTransactions],
  (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const category =
        transaction.category || "Uncategorized";
      acc[category] =
        (acc[category] || 0) + transaction.amount;
      return acc;
    }, {});
  }
);

export const selectMonthlySpendingTrend =
  createSelector([selectTransactions], (transactions) => {
    const monthMap = transactions.reduce(
      (acc, transaction) => {
        const parsedDate = parseISO(transaction.date);

        if (Number.isNaN(parsedDate.valueOf())) {
          return acc;
        }

        const monthKey = format(parsedDate, "yyyy-MM");
        const monthLabel = format(parsedDate, "MMM yyyy");

        acc[monthKey] = {
          month: monthLabel,
          amount:
            (acc[monthKey]?.amount || 0) +
            transaction.amount,
        };

        return acc;
      },
      {}
    );

    return Object.entries(monthMap)
      .sort(([left], [right]) =>
        left.localeCompare(right)
      )
      .map(([, value]) => value);
  });

export const selectTopSpendingCategories =
  createSelector(
    [selectCategoryTotalsMap],
    (totalsMap) => {
      return Object.entries(totalsMap)
        .map(([name, value]) => ({
          name,
          value,
        }))
        .sort((left, right) => right.value - left.value)
        .slice(0, 5);
    }
  );

export const selectBudgetUsage =
  createSelector(
    [selectBudgets, selectCategoryTotalsMap],
    (budgets, categoryTotalsMap) => {
      return budgets.map((budget) => {
        const spentFromTransactions =
          categoryTotalsMap[budget.category];
        const spent =
          typeof spentFromTransactions === "number"
            ? spentFromTransactions
            : budget.spent || 0;
        const percentage =
          budget.limit > 0
            ? (spent / budget.limit) * 100
            : 0;

        return {
          ...budget,
          spent,
          percentage,
        };
      });
    }
  );

export const selectBudgetAlerts =
  createSelector([selectBudgetUsage], (budgetUsage) =>
    budgetUsage
      .filter((budget) => budget.percentage >= 80)
      .sort(
        (left, right) =>
          right.percentage - left.percentage
      )
      .map((budget) => ({
        ...budget,
        severity:
          budget.percentage > 100
            ? "danger"
            : "warning",
      }))
  );

export const selectGoalsProgress =
  createSelector([selectGoals], (goals) =>
    goals.map((goal) => ({
      ...goal,
      percentage:
        goal.targetAmount > 0
          ? Math.min(
              (goal.currentAmount / goal.targetAmount) *
                100,
              100
            )
          : 0,
    }))
  );

export const selectUpcomingBills =
  createSelector([selectBills], (bills) => {
    const today = startOfToday();

    return bills
      .map((bill) => {
        const dueDate = parseISO(bill.dueDate);
        const daysUntilDue = Number.isNaN(
          dueDate.valueOf()
        )
          ? Number.POSITIVE_INFINITY
          : differenceInCalendarDays(dueDate, today);

        return {
          ...bill,
          daysUntilDue,
          isDueSoon: daysUntilDue <= 3,
        };
      })
      .sort((left, right) =>
        left.daysUntilDue - right.daysUntilDue
      );
  });
