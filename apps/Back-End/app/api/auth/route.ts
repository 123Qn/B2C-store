import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { store } from "@repo/db/store";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const user = await store.users.login(email, password);

  if (!user) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "30m" }
  );

  return NextResponse.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
}

export async function DELETE() {
  return NextResponse.json({ message: "Logout successful" });
}