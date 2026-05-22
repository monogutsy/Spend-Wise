import { useState } from "react";

import { useBudgets } from "../hooks/useBudgets";
import { formatCurrency } from "../utils/currencyFormatter";
import { useSelector } from "react-redux";
import { selectCurrency } from "../features/settings/settingsSelectors";
import { selectBudgetUsage } from "../features/dashboard/dashboardSelectors";

function Budgets() {
  const [form, setForm] = useState({
    category: "",
    limit: "",
    spent: "",
  });
  const { createBudget, removeBudget } = useBudgets();
  const budgets = useSelector(selectBudgetUsage);
  const currency = useSelector(selectCurrency);

  function handleSubmit(event) {
    event.preventDefault();

    const didCreate = createBudget(form);
    if (didCreate) {
      setForm({
        category: "",
        limit: "",
        spent: "",
      });
    }
  }

  return (
    <div className="page budgets-page">
      <h1>Budgets</h1>
      <p className="page-subtitle">
        Create monthly limits per category.
      </p>

      <form
        onSubmit={handleSubmit}
        className="form-grid"
      >
        <input
          placeholder="Category"
          value={form.category}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              category: event.target.value,
            }))
          }
        />
        <input
          type="number"
          min="1"
          placeholder="Budget limit"
          value={form.limit}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              limit: event.target.value,
            }))
          }
        />
        <input
          type="number"
          min="0"
          placeholder="Spent (optional)"
          value={form.spent}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              spent: event.target.value,
            }))
          }
        />
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add Budget
        </button>
      </form>

      {budgets.length === 0 ? (
        <p className="empty-text">No budgets yet.</p>
      ) : (
        <div className="stack-list">
          {budgets.map((budget) => {
            const percent = Math.min(
              (budget.spent / budget.limit) * 100 || 0,
              100
            );

            return (
              <div
                key={budget.id}
                className="panel budget-card"
              >
                <div className="panel-header">
                  <h3>{budget.category}</h3>
                  <button
                    className="btn btn-ghost btn-danger"
                    onClick={() =>
                      removeBudget(budget.id)
                    }
                  >
                    Delete
                  </button>
                </div>

                <p className="progress-label">
                  {formatCurrency(
                    budget.spent,
                    currency
                  )}{" "}
                  /{" "}
                  {formatCurrency(
                    budget.limit,
                    currency
                  )}
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
          })}
        </div>
      )}
    </div>
  );
}

export default Budgets;
