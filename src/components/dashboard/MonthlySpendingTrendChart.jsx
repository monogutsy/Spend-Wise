import { useSelector } from "react-redux";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { selectCurrency } from "../../features/settings/settingsSelectors";
import { selectMonthlySpendingTrend } from "../../features/dashboard/dashboardSelectors";
import { formatCurrency } from "../../utils/currencyFormatter";

function MonthlySpendingTrendChart() {
  const data = useSelector(selectMonthlySpendingTrend);
  const currency = useSelector(selectCurrency);

  return (
    <div className="panel chart-panel">
      <h3>Monthly Spending Trend</h3>

      {data.length === 0 ? (
        <p className="empty-text">
          Add expenses to view spending trends.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="4 6"
              stroke="var(--chart-grid-color)"
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "var(--color-text-soft)" }}
            />
            <YAxis
              tick={{ fill: "var(--color-text-soft)" }}
            />
            <Tooltip
              formatter={(value) =>
                formatCurrency(value, currency)
              }
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="var(--chart-primary)"
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default MonthlySpendingTrendChart;
