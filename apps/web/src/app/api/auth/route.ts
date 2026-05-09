import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // fake user login
  if (email !== "test@mail.com" || password !== "123") {
    return NextResponse.json(
      { message: "Invalid login" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  cookieStore.set("auth_token", "buyer", {
    httpOnly: true,
    path: "/",
  });

  return NextResponse.json({
    message: "Login successful",
  });
}

export async function DELETE() {
  const cookieStore = await cookies();

  cookieStore.delete("auth_token");

  return NextResponse.json({
    message: "Logged out",
  });
}