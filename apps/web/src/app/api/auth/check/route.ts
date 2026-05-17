import { NextResponse } from "next/server";
import { checkAuth } from "@/app/utils/auth";

export async function GET() {

  const user: any =
    await checkAuth();

  // NOT LOGIN
  if (!user) {

    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );

  }

  return NextResponse.json({

    message: "OK",

    user,

  });

}