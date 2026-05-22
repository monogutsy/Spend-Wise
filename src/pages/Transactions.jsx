import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import TransactionForm from "../components/transactions/TransactionForm";
import TransactionFilter from "../components/transactions/TransactionFilter";
import TransactionTable from "../components/transactions/TransactionTable";
import { useTransactions } from "../hooks/useTransactions";
import { selectCategories } from "../features/categories/categorySelectors";
import { selectCurrency } from "../features/settings/settingsSelectors";
import {
  selectTotalExpenses,
  selectTransactions,
} from "../features/transactions/transactionSelectors";
import { selectBudgetUsage } from "../features/dashboard/dashboardSelectors";
import { selectGoals } from "../features/goals/goalSelectors";
import { filterTransactions } from "../features/transactions/transactionUtils";
import {
  exportDashboardToPdf,
  exportTransactionsToExcel,
} from "../services/exportService";
import { DEFAULT_INCOME } from "../utils/constants";
import { formatCurrency } from "../utils/currencyFormatter";

function Transactions() {
  const [query, setQuery] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const categories = useSelector(selectCategories);
  const currency = useSelector(selectCurrency);
  const allTransactions = useSelector(selectTransactions);
  const totalExpenses = useSelector(selectTotalExpenses);
  const budgets = useSelector(selectBudgetUsage);
  const goals = useSelector(selectGoals);
  const {
    transactions,
    createTransaction,
    removeTransaction,
  } = useTransactions();

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, query),
    [transactions, query]
  );

  async function handleExportExcel() {
    setExportError("");
    setIsExporting(true);

    try {
      await exportTransactionsToExcel(allTransactions);
    } catch (error) {
      setExportError(
        error?.message || "Unable to export Excel."
      );
    } finally {
      setIsExporting(false);
    }
  }

  async function handleExportPdf() {
    setExportError("");
    setIsExporting(true);

    try {
      await exportDashboardToPdf({
        summary: {
          balance: formatCurrency(
            DEFAULT_INCOME - totalExpenses,
            currency
          ),
          income: formatCurrency(
            DEFAULT_INCOME,
            currency
          ),
          expenses: formatCurrency(
            totalExpenses,
            currency
          ),
        },
        transactions: allTransactions,
        budgets,
        goals,
      });
    } catch (error) {
      setExportError(
        error?.message || "Unable to export PDF."
      );
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="page transactions-page">
      <h1>Transactions</h1>
      <p className="page-subtitle">
        Add, filter, and export your transaction history.
      </p>

      <TransactionForm
        categories={categories}
        onSubmit={createTransaction}
      />

      <div className="toolbar">
        <TransactionFilter
          query={query}
          onChange={setQuery}
        />
        <button
          className="btn btn-secondary"
          onClick={handleExportPdf}
          disabled={isExporting}
        >
          Export PDF
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleExportExcel}
          disabled={isExporting}
        >
          Export Excel
        </button>
      </div>

      {exportError ? (
        <p className="form-error">{exportError}</p>
      ) : null}

      <TransactionTable
        transactions={filteredTransactions}
        currency={currency}
        onDelete={removeTransaction}
      />
    </div>
  );
}

export default Transactions;
