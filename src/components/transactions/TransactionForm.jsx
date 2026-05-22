import { useState } from "react";

function TransactionForm({
  categories,
  onSubmit,
}) {
  const [form, setForm] = useState({
    title: "",
    category: categories[0] || "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const didCreate = onSubmit(form);

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
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        name="amount"
        type="number"
        min="0.01"
        step="0.01"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />

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
