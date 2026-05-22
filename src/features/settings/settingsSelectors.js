export const selectSettingsState = (state) =>
  state.settings;

export const selectCurrency = (state) =>
  selectSettingsState(state).currency;

export const selectDarkMode = (state) =>
  selectSettingsState(state).darkMode;
