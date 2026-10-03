import { NextResponse } from "next/server";
import { store } from "@repo/db/store";

export async function GET() {
  try {
    const orders = await store.orders.all();

    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);
    return NextResponse.json([], { status: 500 });
  }
}