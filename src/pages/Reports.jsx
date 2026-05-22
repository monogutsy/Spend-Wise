import { useSelector } from "react-redux";

import { selectTransactions } from "../features/transactions/transactionSelectors";
import { selectCurrency } from "../features/settings/settingsSelectors";
import { buildCategoryTotals } from "../utils/chartHelpers";
import { formatCurrency } from "../utils/currencyFormatter";

function Reports() {
  const transactions = useSelector(selectTransactions);
  const currency = useSelector(selectCurrency);
  const categoryTotals = buildCategoryTotals(transactions);

  return (
    <div className="page reports-page">
      <h1>Reports</h1>
      <p className="page-subtitle">
        Category-level spending totals.
      </p>

      {categoryTotals.length === 0 ? (
        <p className="empty-text">
          No transactions yet.
        </p>
      ) : (
        <div className="panel report-list">
          {categoryTotals.map((item) => (
            <div
              key={item.name}
              className="report-row"
            >
              <span>{item.name}</span>
              <strong>
                {formatCurrency(
                  item.value,
                  currency
                )}
              </strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reports;
