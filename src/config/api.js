const DEFAULT_API_URL = "http://localhost:5000";

export const API_BASE_URL = import.meta.env.VITE_API_URL || DEFAULT_API_URL;

export function apiUrl(path) {
  return `${API_BASE_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}
