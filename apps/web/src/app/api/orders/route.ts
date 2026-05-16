import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { client } from "@repo/db/client";

// GET ORDERS
export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json([]);
    }

    const orders = await client.db.order.findMany({
      where: {
        userId: Number(token),
      },

      include: {
        items: {
          include: {
            product: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);

    return NextResponse.json([], {
      status: 500,
    });
  }
}

// CREATE ORDER
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { cart, totalPrice } = await req.json();

    const order = await client.db.order.create({
      data: {
        userId: Number(token),

        totalPrice,

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

    return NextResponse.json({
      message: "Order created",
      order,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}