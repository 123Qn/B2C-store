import { NextResponse } from "next/server";
import { client } from "@repo/db/client";

export async function GET() {
  try {
    const orders = await client.db.order.findMany({
      include: {
        user: true,
        items: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);
    return NextResponse.json([], { status: 500 });
  }
}