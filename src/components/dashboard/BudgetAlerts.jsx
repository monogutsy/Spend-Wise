import { useSelector } from "react-redux";
import { AlertTriangle, ShieldAlert } from "lucide-react";

import { selectCurrency } from "../../features/settings/settingsSelectors";
import { selectBudgetAlerts } from "../../features/dashboard/dashboardSelectors";
import { formatCurrency } from "../../utils/currencyFormatter";

function BudgetAlerts() {
  const alerts = useSelector(selectBudgetAlerts);
  const currency = useSelector(selectCurrency);

  return (
    <div className="panel alerts-panel">
      <div className="panel-header">
        <h3>Budget Alerts</h3>
      </div>

      {alerts.length === 0 ? (
        <p className="empty-text">
          All budgets are currently healthy.
        </p>
      ) : (
        <div className="alerts-grid">
          {alerts.map((alert) => {
            const isDanger =
              alert.severity === "danger";
            const Icon = isDanger
              ? ShieldAlert
              : AlertTriangle;

            return (
              <div
                key={alert.id}
                className={`alert-card ${
                  isDanger
                    ? "alert-card-danger"
                    : "alert-card-warning"
                }`}
              >
                <div className="alert-title">
                  <Icon size={16} />
                  <strong>{alert.category}</strong>
                </div>
                <p>
                  Budget:{" "}
                  {formatCurrency(
                    alert.limit,
                    currency
                  )}
                </p>
                <p>
                  Used:{" "}
                  {formatCurrency(
                    alert.spent,
                    currency
                  )}{" "}
                  ({alert.percentage.toFixed(1)}%)
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BudgetAlerts;
