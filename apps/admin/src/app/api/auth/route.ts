import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "@repo/env/admin";

// POST /api/auth  →  login
export async function POST(request: Request) {
  const { password } = await request.json();

  if (password !== env.PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = jwt.sign(
    { role: "admin" },
    env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  const userCookies = await cookies();
  userCookies.set("auth_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return NextResponse.json({ ok: true });
}

// DELETE /api/auth  →  logout
export async function DELETE() {
  const userCookies = await cookies();
  userCookies.set("auth_token", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0, // immediately expire
  });

  return NextResponse.json({ ok: true });
}