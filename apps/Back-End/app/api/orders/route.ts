import { NextResponse, NextRequest } from "next/server";
import { store } from "@repo/db/store";
import { checkAuth } from "../../../utils/auth";
import { num, readJson, str, ValidationError } from "../../../utils/validate";

// GET ORDERS
export async function GET(request: NextRequest) {
  try {
    const user = await checkAuth(request);

    if (!user) {
      return NextResponse.json([]);
    }

    const orders = await store.orders.forUser(user.id);

    return NextResponse.json(orders);

  } catch (error) {
    console.log(error);
    return NextResponse.json([], { status: 500 });
  }
}

// CREATE ORDER
export async function POST(request: NextRequest) {
  try {
    const user = await checkAuth(request);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { cart } = await readJson(request);

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }
    if (cart.length > 100) {
      return NextResponse.json({ message: "Too many items" }, { status: 400 });
    }

    const lines = cart.map((item: Record<string, unknown>) => ({
      productId: num(item?.id, "Product id", { min: 1, max: Number.MAX_SAFE_INTEGER, integer: true }),
      quantity: num(item?.quantity, "Quantity", { min: 1, max: 99, integer: true }),
      size: str(item?.selectedSize, "Size", { max: 20 }),
    }));

    // prices come from the store, never from the client
    const products = await store.products.byIds([...new Set(lines.map((l) => l.productId))]);
    const byId = new Map(products.map((p) => [p.id, p]));

    for (const line of lines) {
      const product = byId.get(line.productId);
      if (!product || !product.active) {
        return NextResponse.json({ message: "A product in your cart is no longer available" }, { status: 400 });
      }
    }

    const items = lines.map((line) => ({ ...line, price: byId.get(line.productId)!.price }));
    const totalPrice = Math.round(items.reduce((total, i) => total + i.price * i.quantity, 0) * 100) / 100;

    const order = await store.orders.create({
      userId: user.id,
      totalPrice,
      items,
    });

    return NextResponse.json({ message: "Order created", order });

  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    console.log("ORDER ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
