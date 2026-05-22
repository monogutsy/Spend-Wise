export function buildCategoryTotals(transactions) {
  const totals = {};

  transactions.forEach((transaction) => {
    const category = transaction.category || "Uncategorized";
    totals[category] =
      (totals[category] || 0) + (transaction.amount || 0);
  });

  return Object.entries(totals).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
}
