import { NextResponse } from "next/server";
import { store } from "@repo/db/store";
import { requireAdmin } from "../../../../utils/auth";

// ADMIN ONLY: every order with customer email
export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  try {
    const orders = await store.orders.all();
    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);
    return NextResponse.json([], { status: 500 });
  }
}
