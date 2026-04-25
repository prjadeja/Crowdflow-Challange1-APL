const localFallback = "http://localhost:3001";

/**
 * In production, require explicit backend URL via env var.
 * In development, allow localhost fallback for convenience.
 */
export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  (process.env.NODE_ENV === "development" ? localFallback : "");

export const hasBackendUrl = BACKEND_URL.length > 0;
