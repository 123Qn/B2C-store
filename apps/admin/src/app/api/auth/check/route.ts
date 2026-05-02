import { NextResponse } from "next/server";
import { isLoggedIn } from "../../../../utils/auth";


// GET /api/auth/check
// Returns 200 if the JWT cookie is present and valid, 401 otherwise.
export async function GET() {
  const valid = await isLoggedIn();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}