const DEFAULT_TIMEOUT_MS = 8000;

export class RequestError extends Error {
  constructor(message, meta = {}) {
    super(message);
    this.name = "RequestError";
    this.code = meta.code || "UNKNOWN";
    this.status = meta.status;
    this.cause = meta.cause;
  }
}

function normalizeRequestError(error) {
  if (error instanceof RequestError) {
    return error;
  }

  if (error?.name === "AbortError") {
    return new RequestError("Request timed out.", {
      code: "TIMEOUT",
      cause: error,
    });
  }

  return new RequestError("Network request failed.", {
    code: "NETWORK",
    cause: error,
  });
}

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
      throw new RequestError(
        `Request failed: ${response.status} ${response.statusText}`,
        {
          code: "HTTP_ERROR",
          status: response.status,
        }
      );
    }

    try {
      return await response.json();
    } catch (error) {
      throw new RequestError(
        "Invalid JSON response.",
        {
          code: "INVALID_JSON",
          cause: error,
        }
      );
    }
  } catch (error) {
    throw normalizeRequestError(error);
  } finally {
    clearTimeout(timeoutId);
  }
}
