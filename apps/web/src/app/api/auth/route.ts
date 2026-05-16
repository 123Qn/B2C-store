import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

import { client } from "@repo/db/client";

const JWT_SECRET =
  process.env.JWT_SECRET || "secret";

export async function POST(
  req: Request
) {

  const {
    email,
    password,
  } = await req.json();

  const user =
    await client.db.user.findFirst({
      where: {
        email,
        password,
      },
    });

  // INVALID LOGIN
  if (!user) {

    return NextResponse.json(
      {
        message: "Invalid login",
      },
      {
        status: 401,
      }
    );

  }

  // JWT TOKEN
  const token =
    jwt.sign(

      {
        id: user.id,
        role: user.role,
      },

      JWT_SECRET,

      {
        expiresIn: "30m",
      }

    );

  // SAVE jwt TOcookie
  (
    await cookies()
  ).set(
    "auth_token",
    token,
    {
      httpOnly: true,
      path: "/",
      maxAge: 30 * 60,
    }
  );

  return NextResponse.json({

    message:
      "Login successful",

  });

}

export async function DELETE() {

  (
    await cookies()
  ).delete(
    "auth_token"
  );

  return NextResponse.json({

    message:
      "Logged out",

  });

}