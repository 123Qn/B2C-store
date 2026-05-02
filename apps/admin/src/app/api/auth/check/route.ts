import { NextResponse } from "next/server";
import { isLoggedIn } from "../../../../utils/auth";

export async function GET() {
  const valid = await isLoggedIn();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}