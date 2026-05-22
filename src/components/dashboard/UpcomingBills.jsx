import { useSelector } from "react-redux";
import { AlarmClock } from "lucide-react";

import { selectUpcomingBills } from "../../features/dashboard/dashboardSelectors";
import { selectCurrency } from "../../features/settings/settingsSelectors";
import { formatCurrency } from "../../utils/currencyFormatter";
import { formatDate } from "../../utils/dateFormatter";

function UpcomingBills() {
  const bills = useSelector(selectUpcomingBills);
  const currency = useSelector(selectCurrency);

  return (
    <div className="panel bills-widget">
      <h3>Upcoming Bills</h3>
      {bills.length === 0 ? (
        <p className="empty-text">No upcoming bills.</p>
      ) : (
        <div className="stack-list">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className={`bill-row ${
                bill.isDueSoon ? "bill-row-soon" : ""
              }`}
            >
              <div className="bill-content">
                <strong>{bill.name}</strong>
                <p className="list-meta">
                  Due {formatDate(bill.dueDate)}
                </p>
              </div>
              <div className="bill-metrics">
                <strong>
                  {formatCurrency(
                    bill.amount,
                    currency
                  )}
                </strong>
                {bill.isDueSoon ? (
                  <span className="bill-badge">
                    <AlarmClock size={14} />
                    {bill.daysUntilDue < 0
                      ? `Overdue by ${Math.abs(
                          bill.daysUntilDue
                        )} day${
                          Math.abs(bill.daysUntilDue) === 1
                            ? ""
                            : "s"
                        }`
                      : `Due in ${bill.daysUntilDue} day${
                          bill.daysUntilDue === 1
                            ? ""
                            : "s"
                        }`}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingBills;
