import { useState } from "react";
import { useSelector } from "react-redux";

import { useGoals } from "../hooks/useGoals";
import { selectCurrency } from "../features/settings/settingsSelectors";
import { formatCurrency } from "../utils/currencyFormatter";

function Goals() {
  const [form, setForm] = useState({
    name: "",
    currentAmount: "",
    targetAmount: "",
  });
  const { goals, createGoal, removeGoal } = useGoals();
  const currency = useSelector(selectCurrency);

  function handleSubmit(event) {
    event.preventDefault();
    const didCreate = createGoal(form);

    if (didCreate) {
      setForm({
        name: "",
        currentAmount: "",
        targetAmount: "",
      });
    }
  }

  return (
    <div className="page goals-page">
      <h1>Goals</h1>
      <p className="page-subtitle">
        Track progress toward savings targets.
      </p>

      <form
        onSubmit={handleSubmit}
        className="form-grid"
      >
        <input
          placeholder="Goal name"
          value={form.name}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              name: event.target.value,
            }))
          }
        />
        <input
          type="number"
          min="0"
          placeholder="Current amount"
          value={form.currentAmount}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              currentAmount: event.target.value,
            }))
          }
        />
        <input
          type="number"
          min="1"
          placeholder="Target amount"
          value={form.targetAmount}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              targetAmount: event.target.value,
            }))
          }
        />
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add Goal
        </button>
      </form>

      {goals.length === 0 ? (
        <p className="empty-text">No goals yet.</p>
      ) : (
        <div className="stack-list">
          {goals.map((goal) => {
            const percent = Math.min(
              (goal.currentAmount /
                goal.targetAmount) *
                100 || 0,
              100
            );

            return (
              <div
                key={goal.id}
                className="panel goal-card"
              >
                <div className="panel-header">
                  <h3>{goal.name}</h3>
                  <button
                    className="btn btn-ghost btn-danger"
                    onClick={() =>
                      removeGoal(goal.id)
                    }
                  >
                    Delete
                  </button>
                </div>

                <p className="progress-label">
                  {formatCurrency(
                    goal.currentAmount,
                    currency
                  )}{" "}
                  /{" "}
                  {formatCurrency(
                    goal.targetAmount,
                    currency
                  )}
                </p>

                <div className="progress-track">
                  <div
                    className="progress-fill progress-fill-success"
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

export default Goals;
