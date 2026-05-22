export const selectCategoriesState = (state) =>
  state.categories;

export const selectCategories = (state) =>
  selectCategoriesState(state).categories;
