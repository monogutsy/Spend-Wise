import { useSelector } from "react-redux";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { buildCategoryTotals } from "../../utils/chartHelpers";

function ExpensePieChart() {
  const transactions = useSelector(
    (state) => state.transactions.transactions
  );

  const data = buildCategoryTotals(transactions);

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
  ];

  return (
    <div className="panel">
      <h3>Spending By Category</h3>
      {data.length === 0 ? (
        <p className="empty-text">
          No expense data yet.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={80}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ExpensePieChart;
