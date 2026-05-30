import { useMemo, useState } from "react";

function TransactionForm({
  categories,
  onSubmit,
}) {
  const availableCategories = useMemo(
    () =>
      categories.length > 0
        ? categories
        : ["Uncategorized"],
    [categories]
  );

  const [form, setForm] = useState({
    title: "",
    category: availableCategories[0],
    amount: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState("");
  const selectedCategory =
    availableCategories.includes(form.category)
      ? form.category
      : availableCategories[0];

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const didCreate = onSubmit({
      ...form,
      category: selectedCategory,
    });

    if (!didCreate) {
      setError("Please fill all fields correctly.");
      return;
    }

    setError("");
    setForm((prev) => ({
      ...prev,
      title: "",
      amount: "",
    }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="form-grid"
    >
      <label className="field-label">
        <span>Title</span>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Expense title"
          required
        />
      </label>

      <label className="field-label">
        <span>Category</span>
        <select
          name="category"
          value={selectedCategory}
          onChange={handleChange}
          required
        >
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="field-label">
        <span>Amount</span>
        <input
          name="amount"
          type="number"
          min="0.01"
          step="0.01"
          value={form.amount}
          onChange={handleChange}
          placeholder="0.00"
          required
        />
      </label>

      <label className="field-label">
        <span>Date</span>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
      </label>

      <button
        type="submit"
        className="btn btn-primary"
      >
        Add Transaction
      </button>

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}
    </form>
  );
}

export default TransactionForm;
