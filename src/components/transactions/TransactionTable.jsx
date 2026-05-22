import { formatCurrency } from "../../utils/currencyFormatter";
import { formatDate } from "../../utils/dateFormatter";

function TransactionTable({
  transactions,
  currency,
  onDelete,
}) {
  if (transactions.length === 0) {
    return (
      <p className="empty-text">
        No transactions found.
      </p>
    );
  }

  return (
    <div className="table-shell">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {transactions.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{formatDate(item.date)}</td>
              <td>
                {formatCurrency(item.amount, currency)}
              </td>
              <td>
                <button
                  className="btn btn-ghost btn-danger"
                  onClick={() => onDelete(item.id)}
                  aria-label={`Delete ${item.title}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
