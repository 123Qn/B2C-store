import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export type AuthUser = { id: number; role: "ADMIN" | "BUYER" };

// No hard-coded fallback in production: a known secret would let anyone forge an admin token.
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") return "dev-only-secret";
  throw new Error("JWT_SECRET is not set");
}

export function signToken(user: AuthUser) {
  return jwt.sign({ id: user.id, role: user.role }, getJwtSecret(), {
    algorithm: "HS256",
    expiresIn: "30m",
  });
}

export async function checkAuth(request: Request): Promise<AuthUser | null> {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, getJwtSecret(), { algorithms: ["HS256"] });
    if (typeof payload !== "object" || payload === null) return null;

    const id = Number((payload as { id?: unknown }).id);
    const role = (payload as { role?: unknown }).role;
    if (!Number.isInteger(id) || (role !== "ADMIN" && role !== "BUYER")) return null;

    return { id, role };
  } catch {
    return null;
  }
}

// Returns the admin user, or a 401/403 response to send back.
export async function requireAdmin(request: Request): Promise<AuthUser | NextResponse> {
  const user = await checkAuth(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (user.role !== "ADMIN") return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  return user;
}
