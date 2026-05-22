export function filterTransactions(
  transactions,
  query = ""
) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return transactions;
  }

  return transactions.filter((transaction) => {
    return (
      transaction.title
        ?.toLowerCase()
        .includes(normalized) ||
      transaction.category
        ?.toLowerCase()
        .includes(normalized)
    );
  });
}
