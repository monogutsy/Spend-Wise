export const selectAuthState = (state) => state.auth;

export const selectCurrentUser = (state) =>
  selectAuthState(state).user;

export const selectIsAuthenticated = (state) =>
  Boolean(selectCurrentUser(state));

export const selectAuthStatus = (state) =>
  selectAuthState(state).status;

export const selectAuthError = (state) =>
  selectAuthState(state).error;

export const selectAuthInitialized = (state) =>
  selectAuthState(state).initialized;

export const selectIsAuthLoading = (state) =>
  selectAuthStatus(state) === "loading";

export const selectFirebaseConfigured = (state) =>
  selectAuthState(state).isFirebaseConfigured;
