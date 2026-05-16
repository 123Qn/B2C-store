import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "secret";

export async function GET() {

  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      "auth_token"
    )?.value;

  // NO TOKEN
  if (!token) {

    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );

  }

  try {

    const decoded =
      jwt.verify(
        token,
        JWT_SECRET
      );

    return NextResponse.json({

      message: "OK",

      user: decoded,

    });

  }

  catch {

    return NextResponse.json(
      {
        message: "Invalid token",
      },
      {
        status: 401,
      }
    );

  }

}