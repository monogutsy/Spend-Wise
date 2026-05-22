import { formatDate } from "../utils/dateFormatter";

function toCsv(dataRows) {
  return dataRows
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
        .join(",")
    )
    .join("\n");
}

export function exportTransactionsToCsv(transactions) {
  const header = ["Title", "Category", "Amount", "Date"];
  const rows = transactions.map((transaction) => [
    transaction.title,
    transaction.category,
    transaction.amount,
    transaction.date,
  ]);

  const csv = toCsv([header, ...rows]);
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "transactions.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export async function exportTransactionsToExcel(
  transactions
) {
  const XLSX = await import("xlsx");

  const rows = transactions.map((transaction) => ({
    Date: transaction.date,
    Title: transaction.title,
    Category: transaction.category,
    Amount: transaction.amount,
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Transactions"
  );

  XLSX.writeFile(workbook, "spendwise-transactions.xlsx");
}

export async function exportDashboardToPdf({
  summary,
  transactions,
  budgets,
  goals,
}) {
  const [{ jsPDF }, { default: autoTable }] =
    await Promise.all([
      import("jspdf"),
      import("jspdf-autotable"),
    ]);

  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  doc.setFontSize(16);
  doc.text("SpendWise Financial Report", 40, 40);

  doc.setFontSize(11);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 40, 60);

  autoTable(doc, {
    startY: 80,
    head: [["Metric", "Value"]],
    body: [
      ["Total Balance", summary.balance],
      ["Income", summary.income],
      ["Expenses", summary.expenses],
    ],
    theme: "grid",
    styles: { fontSize: 10 },
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [["Date", "Title", "Category", "Amount"]],
    body: transactions.map((transaction) => [
      formatDate(transaction.date),
      transaction.title,
      transaction.category,
      transaction.amount,
    ]),
    theme: "striped",
    styles: { fontSize: 9 },
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [["Category", "Limit", "Spent"]],
    body: budgets.map((budget) => [
      budget.category,
      budget.limit,
      budget.spent,
    ]),
    theme: "striped",
    styles: { fontSize: 9 },
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [["Goal", "Current", "Target"]],
    body: goals.map((goal) => [
      goal.name,
      goal.currentAmount,
      goal.targetAmount,
    ]),
    theme: "striped",
    styles: { fontSize: 9 },
  });

  doc.save("spendwise-dashboard-report.pdf");
}
