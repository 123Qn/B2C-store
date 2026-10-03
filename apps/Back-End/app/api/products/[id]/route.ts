import { NextRequest, NextResponse } from "next/server";
import { store } from "@repo/db/store";
import { requireAdmin } from "../../../../utils/auth";
import { bool, num, readJson, ValidationError } from "../../../../utils/validate";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // TRY BY urlId
    const product = await store.products.byUrlId(id);

    if (!product || !product.active) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// ADMIN ONLY: show / hide a product
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  try {
    const { id } = await context.params;
    const productId = num(id, "Product id", { min: 1, max: Number.MAX_SAFE_INTEGER, integer: true });
    const body = await readJson(request);

    const product = await store.products.setActive(productId, bool(body.active, "active"));

    if (!product) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated", product });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
