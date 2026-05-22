function TransactionFilter({
  query,
  onChange,
}) {
  return (
    <input
      className="filter-input"
      value={query}
      onChange={(event) =>
        onChange(event.target.value)
      }
      placeholder="Filter by title or category"
    />
  );
}

export default TransactionFilter;
