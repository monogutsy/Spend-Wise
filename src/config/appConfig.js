export const AUTH_REQUIRED =
  import.meta.env.VITE_AUTH_REQUIRED === "true";

export const NEWS_PROXY_URL =
  import.meta.env.VITE_NEWS_PROXY_URL || "";

export const ALLOW_INSECURE_CLIENT_NEWS_KEY =
  import.meta.env
    .VITE_ALLOW_INSECURE_CLIENT_NEWS_KEY === "true";
