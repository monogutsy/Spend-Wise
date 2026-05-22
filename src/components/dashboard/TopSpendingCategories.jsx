import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { selectCurrency } from "../../features/settings/settingsSelectors";
import { selectTopSpendingCategories } from "../../features/dashboard/dashboardSelectors";
import { formatCurrency } from "../../utils/currencyFormatter";

function TopSpendingCategories() {
  const categories = useSelector(
    selectTopSpendingCategories
  );
  const currency = useSelector(selectCurrency);

  return (
    <div className="panel chart-panel">
      <h3>Top Spending Categories</h3>
      {categories.length === 0 ? (
        <p className="empty-text">
          No category data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={categories}
            layout="vertical"
            margin={{ top: 8, right: 24, left: 10, bottom: 8 }}
          >
            <CartesianGrid
              strokeDasharray="4 6"
              stroke="var(--chart-grid-color)"
            />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              tick={{ fill: "var(--color-text-soft)" }}
            />
            <Tooltip
              formatter={(value) =>
                formatCurrency(value, currency)
              }
            />
            <Bar
              dataKey="value"
              fill="var(--chart-secondary)"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default TopSpendingCategories;
