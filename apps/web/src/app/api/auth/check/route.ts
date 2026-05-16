import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { client } from "@repo/db/client";

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth_token")?.value;

  // NO TOKEN
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  // FIND USER
  const user = await client.db.user.findUnique({
    where: {
      id: Number(token),
    },
  });

  // INVALID USER
  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: "OK",
    user,
  });
}