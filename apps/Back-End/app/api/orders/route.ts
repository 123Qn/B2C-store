import { NextResponse, NextRequest } from "next/server";
import { store } from "@repo/db/store";
import { checkAuth } from "../../../utils/auth";

// GET ORDERS
export async function GET(request: NextRequest) {
  try {
    const user: any = await checkAuth(request);

    if (!user) {
      return NextResponse.json([]);
    }

    const orders = await store.orders.forUser(Number(user.id));

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

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    const order = await store.orders.create({
      userId: Number(user.id),
      totalPrice: Number(totalPrice),
      items: cart.map((item: any) => ({
        productId: Number(item.id),
        quantity: Number(item.quantity),
        size: String(item.selectedSize),
        price: Number(item.price),
      })),
    });

    return NextResponse.json({ message: "Order created", order });

  } catch (error) {
    console.log("ORDER ERROR:", error) 
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}