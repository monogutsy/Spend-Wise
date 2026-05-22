import { useSelector } from "react-redux";

import { selectCurrency } from "../../features/settings/settingsSelectors";
import { selectGoalsProgress } from "../../features/dashboard/dashboardSelectors";
import { formatCurrency } from "../../utils/currencyFormatter";

function FinancialGoalsWidget() {
  const goals = useSelector(selectGoalsProgress);
  const currency = useSelector(selectCurrency);

  return (
    <div className="panel goals-widget">
      <h3>Financial Goals</h3>
      {goals.length === 0 ? (
        <p className="empty-text">
          No goals available yet.
        </p>
      ) : (
        <div className="stack-list">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="goal-progress-item"
            >
              <div className="list-row">
                <div className="list-content">
                  <strong>{goal.name}</strong>
                  <p className="list-meta">
                    {formatCurrency(
                      goal.currentAmount,
                      currency
                    )}{" "}
                    of{" "}
                    {formatCurrency(
                      goal.targetAmount,
                      currency
                    )}
                  </p>
                </div>
                <p className="list-value">
                  {goal.percentage.toFixed(0)}%
                </p>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill progress-fill-success"
                  style={{
                    width: `${goal.percentage}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FinancialGoalsWidget;
