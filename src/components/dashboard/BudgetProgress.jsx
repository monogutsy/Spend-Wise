import { useSelector } from "react-redux";

import { selectBudgetUsage } from "../../features/dashboard/dashboardSelectors";
import { selectCurrency } from "../../features/settings/settingsSelectors";
import { formatCurrency } from "../../utils/currencyFormatter";

function BudgetProgress() {
  const budgetUsage = useSelector(selectBudgetUsage);
  const currency = useSelector(selectCurrency);
  const totalBudget = budgetUsage.reduce(
    (sum, budget) => sum + budget.limit,
    0
  );
  const spent = budgetUsage.reduce(
    (sum, budget) => sum + budget.spent,
    0
  );

  if (totalBudget === 0) {
    return (
      <div className="panel">
        <h3>Monthly Budget</h3>
        <p className="empty-text">
          No budgets created yet.
        </p>
      </div>
    );
  }

  const percent = Math.min(
    (spent / totalBudget) * 100,
    100
  );

  return (
    <div className="panel">
      <h3>Monthly Budget</h3>

      <p className="progress-label">
        {formatCurrency(spent, currency)} /{" "}
        {formatCurrency(totalBudget, currency)}
      </p>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  );
}

export default BudgetProgress;
