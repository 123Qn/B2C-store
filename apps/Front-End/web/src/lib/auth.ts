// Client-side helpers for the JWT kept in localStorage.
// These only shape the UI — the API checks the token on every protected route.

export type TokenPayload = { id: number; role: "ADMIN" | "BUYER"; exp?: number };

export function getToken(): string | null {
  try {
    return localStorage.getItem("auth_token");
  } catch {
    return null;
  }
}

export function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// decodes (does NOT verify) the token payload
export function readToken(): TokenPayload | null {
  const token = getToken();
  if (!token) return null;
  try {
    const base64 = (token.split(".")[1] ?? "").replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64)) as TokenPayload;
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
