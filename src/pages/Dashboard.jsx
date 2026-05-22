import { useSelector } from "react-redux";
import {
  Globe,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

import CurrencyCard from "../components/dashboard/CurrencyCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import ExpensePieChart from "../components/dashboard/ExpensePieChart";
import BudgetProgress from "../components/dashboard/BudgetProgress";
import FinanceNews from "../components/dashboard/FinanceNews";
import CryptoCard from "../components/dashboard/CryptoCard";
import MonthlySpendingTrendChart from "../components/dashboard/MonthlySpendingTrendChart";
import TopSpendingCategories from "../components/dashboard/TopSpendingCategories";
import BudgetAlerts from "../components/dashboard/BudgetAlerts";
import FinancialGoalsWidget from "../components/dashboard/FinancialGoalsWidget";
import UpcomingBills from "../components/dashboard/UpcomingBills";
import { DEFAULT_INCOME } from "../utils/constants";
import { formatCurrency } from "../utils/currencyFormatter";
import { selectCurrency } from "../features/settings/settingsSelectors";
import { selectTotalExpenses } from "../features/transactions/transactionSelectors";

function Dashboard() {
  const currency = useSelector(selectCurrency);
  const totalExpenses = useSelector(selectTotalExpenses);
  const balance = DEFAULT_INCOME - totalExpenses;

  return (
    <div className="page dashboard-page">
      <div className="dashboard-header">
        <h1>Good Afternoon</h1>
        <p>Here&apos;s your financial summary for today.</p>
      </div>

      <div className="cards">
        <div className="card balance-card">
          <div className="card-header">
            <Wallet size={24} />
            <h3>Total Balance</h3>
          </div>
          <p className="balance-value">
            {formatCurrency(balance, currency)}
          </p>
        </div>

        <div className="card income-card">
          <div className="card-header">
            <TrendingUp size={24} />
            <h3>Income</h3>
          </div>
          <p className="income-value">
            {formatCurrency(DEFAULT_INCOME, currency)}
          </p>
        </div>

        <div className="card expense-card">
          <div className="card-header">
            <TrendingDown size={24} />
            <h3>Expenses</h3>
          </div>
          <p className="expense-value">
            {formatCurrency(totalExpenses, currency)}
          </p>
        </div>

        <div className="card exchange-card">
          <div className="card-header">
            <Globe size={24} />
            <h3>Exchange Rates</h3>
          </div>
          <CurrencyCard />
        </div>
      </div>

      <div className="dashboard-grid dashboard-grid-single">
        <MonthlySpendingTrendChart />
      </div>

      <div className="dashboard-grid">
        <ExpensePieChart />
        <TopSpendingCategories />
      </div>

      <div className="dashboard-grid">
        <BudgetProgress />
        <BudgetAlerts />
      </div>

      <div className="dashboard-grid">
        <FinancialGoalsWidget />
        <UpcomingBills />
      </div>

      <div className="dashboard-grid">
        <RecentTransactions />
        <FinanceNews />
      </div>

      <div className="dashboard-grid dashboard-grid-single">
        <CryptoCard />
      </div>
    </div>
  );
}

export default Dashboard;
