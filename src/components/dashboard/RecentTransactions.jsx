import { useSelector } from "react-redux";

import { selectCurrency } from "../../features/settings/settingsSelectors";
import { selectTransactions } from "../../features/transactions/transactionSelectors";
import { formatCurrency } from "../../utils/currencyFormatter";
import { formatDate } from "../../utils/dateFormatter";

function RecentTransactions() {
  const transactions = useSelector(selectTransactions);
  const currency = useSelector(selectCurrency);
  const latestTransactions = [...transactions]
    .sort((left, right) =>
      right.date.localeCompare(left.date)
    )
    .slice(0, 5);

  return (
    <div className="panel">
      <h3>Recent Transactions</h3>

      {latestTransactions.length === 0 ? (
        <p className="empty-text">No transactions yet.</p>
      ) : (
        latestTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="list-row"
          >
            <div className="list-content">
              <strong>{transaction.title}</strong>
              <p className="list-meta">
                {transaction.category} -{" "}
                {formatDate(transaction.date)}
              </p>
            </div>

            <p className="list-value">
              {formatCurrency(
                transaction.amount,
                currency
              )}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentTransactions;
