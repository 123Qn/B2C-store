import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { client } from "@repo/db/client";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // FIND USER
  const user = await client.db.user.findFirst({
    where: {
      email,
      password,
    },
  });

  // INVALID LOGIN
  if (!user) {
    return NextResponse.json(
      { message: "Invalid login" },
      { status: 401 }
    );
  }

  // SET COOKIE
  const cookieStore = await cookies();

  cookieStore.set("auth_token", String(user.id), {
    httpOnly: true,
    path: "/",
  });

  return NextResponse.json({
    message: "Login successful",
    user,
  });
}

export async function DELETE() {
  const cookieStore = await cookies();

  cookieStore.delete("auth_token");

  return NextResponse.json({
    message: "Logged out",
  });
}