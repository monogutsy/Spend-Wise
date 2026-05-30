const STORAGE_KEY = "spendwise.state.v1";
const DEFAULT_DEBOUNCE_MS = 700;

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

export function createDebouncedStateSaver(
  delayMs = DEFAULT_DEBOUNCE_MS
) {
  let timeoutId = null;
  let lastSerializedState = "";

  return (state) => {
    const serializedState = JSON.stringify(state);

    if (serializedState === lastSerializedState) {
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      lastSerializedState = serializedState;
      saveState(state);
    }, delayMs);
  };
}
