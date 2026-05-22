const STORAGE_KEY = "spendwise.state.v1";

export function loadState() {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);

    if (!serializedState) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Failed to load persisted state", error);
    return undefined;
  }
}

export function saveState(state) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch (error) {
    console.error("Failed to persist state", error);
  }
}
