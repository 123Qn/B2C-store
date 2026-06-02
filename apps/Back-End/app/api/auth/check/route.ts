import { NextResponse, NextRequest } from "next/server";
import { checkAuth } from "../../../../utils/auth";

export async function GET(request: NextRequest) {
  const user = await checkAuth(request);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "OK", user });
}