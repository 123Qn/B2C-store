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

  // FIND USER
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

  // CREATE JWT TOKEN
  const token = jwt.sign(

    {
      id: user.id,
      email: user.email,
      role: user.role,
    },

    JWT_SECRET,

    {
      expiresIn: "1h",
    }

  );

  // SET COOKIE
  const cookieStore =
    await cookies();

  cookieStore.set(
    "auth_token",
    token,
    {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60,
    }
  );

  return NextResponse.json({

    message:
      "Login successful",

    user,

  });

}

export async function DELETE() {

  const cookieStore =
    await cookies();

  cookieStore.delete(
    "auth_token"
  );

  return NextResponse.json({

    message:
      "Logged out",

  });

}