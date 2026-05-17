// utils/auth.ts

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "secret";

export async function checkAuth() {

  const token =
    (await cookies())
      .get("auth_token")
      ?.value;

  if (!token) {
    return null;
  }

  try {

    const decoded =
      jwt.verify(
        token,
        JWT_SECRET
      );

    return decoded;

  }

  catch {

    return null;

  }

}