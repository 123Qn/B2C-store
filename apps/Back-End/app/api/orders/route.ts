import { NextResponse, NextRequest } from "next/server";
import { client } from "@repo/db/client";
import { checkAuth } from "../../../utils/auth";

// GET ORDERS
export async function GET(request: NextRequest) {
  try {
    const user: any = await checkAuth(request);

console.log("USER FROM TOKEN:", user);
console.log("USER ID:", user?.id, typeof user?.id);
    if (!user) {
      return NextResponse.json([]);
    }

    const orders = await client.db.order.findMany({
      where: { userId: user.id },
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);

  } catch (error) {
    console.log(error);
    return NextResponse.json([], { status: 500 });
  }
}

// CREATE ORDER
export async function POST(request: NextRequest) {
  try {
    const user: any = await checkAuth(request);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { cart, totalPrice } = await request.json();

    const order = await client.db.order.create({
      data: {
        totalPrice,
        user: { connect: { id: user.id } },
        items: {
          create: cart.map((item: any) => ({
            productId: Number(item.id),
            quantity: Number(item.quantity),
            size: String(item.selectedSize),
            price: Number(item.price),
          })),
        },
      },
    });

    return NextResponse.json({ message: "Order created", order });

  } catch (error) {
    console.log("ORDER ERROR:", error) 
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}