import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { client } from "@repo/db/client";

const JWT_SECRET =
  process.env.JWT_SECRET || "secret";

// LOGIN
export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email;
  const password = body.password;

  // FIND USER
  const user =
    await client.db.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

  // INVALID LOGIN
  if (!user) {
    return NextResponse.json(
      {
        message:
          "Invalid email or password",
      },
      {
        status: 401,
      }
    );

  }

  // CREATE TOKEN
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "30m",
    }
  );

  // SAVE COOKIE
  (
    await cookies()
  ).set(
    "auth_token",
    token,
    {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 30,
    }
  );

  // SUCCESS
  return NextResponse.json({
    message: "Login successful",

    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });

}

// LOGOUT
export async function DELETE() {
  (
    await cookies()
  ).delete("auth_token");
  return NextResponse.json({
    message: "Logout successful",
  });

}