import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addCategory,
  deleteCategory,
} from "../features/categories/categorySlice";
import { selectCategories } from "../features/categories/categorySelectors";

function Categories() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  function handleSubmit(event) {
    event.preventDefault();
    const normalized = value.trim();

    if (
      !normalized ||
      categories.includes(normalized)
    ) {
      return;
    }

    dispatch(addCategory(normalized));
    setValue("");
  }

  return (
    <div className="page categories-page">
      <h1>Categories</h1>
      <p className="page-subtitle">
        Manage expense categories used across transactions and
        budgets.
      </p>

      <form
        onSubmit={handleSubmit}
        className="inline-form"
      >
        <input
          value={value}
          onChange={(event) =>
            setValue(event.target.value)
          }
          placeholder="Add category"
        />
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add Category
        </button>
      </form>

      <ul className="category-grid">
        {categories.map((category) => (
          <li
            key={category}
            className="category-item"
          >
            <span>{category}</span>
            <button
              className="btn btn-ghost btn-danger"
              onClick={() =>
                dispatch(deleteCategory(category))
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
