import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";

import Modal from "../ui/Modal";
import { useTransactions } from "../../hooks/useTransactions";
import { selectCategories } from "../../features/categories/categorySelectors";

function QuickAddExpense() {
  const categories = useSelector(selectCategories);
  const availableCategories = useMemo(
    () =>
      categories.length > 0
        ? categories
        : ["Uncategorized"],
    [categories]
  );
  const { createTransaction } = useTransactions();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: availableCategories[0],
    date: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState("");
  const selectedCategory =
    availableCategories.includes(form.category)
      ? form.category
      : availableCategories[0];

  function openModal() {
    setError("");
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setError("");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const didCreate = createTransaction({
      ...form,
      category: selectedCategory,
    });

    if (!didCreate) {
      setError("Please provide valid expense details.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      title: "",
      amount: "",
      category: availableCategories[0],
      date: new Date().toISOString().slice(0, 10),
    }));
    closeModal();
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary quick-add-button"
        onClick={openModal}
      >
        <Plus size={18} />
        Add Expense
      </button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Quick Add Expense"
      >
        <form
          className="form-grid modal-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            min="0.01"
            step="0.01"
            required
          />
          <select
            name="category"
            value={selectedCategory}
            onChange={handleChange}
          >
            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          {error ? (
            <p className="form-error">{error}</p>
          ) : null}
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Expense
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default QuickAddExpense;
