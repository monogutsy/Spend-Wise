const DEFAULT_TIMEOUT_MS = 8000;

export async function requestJson(url, options = {}) {
  const {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    ...fetchOptions
  } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    timeoutMs
  );

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}
