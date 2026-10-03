//get all products
import { NextResponse, NextRequest } from "next/server";

import { store, StoreConflictError } from "@repo/db/store";
import { requireAdmin } from "../../../utils/auth";
import { httpUrl, num, oneOf, readJson, str, strList, ValidationError } from "../../../utils/validate";

const GENDERS = ["Unisex", "Men", "Women", "Teen", "Kids"] as const;

export async function GET() {
  try {
    const products =
      await store.products.list({ activeOnly: true });

    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json([], { status: 500 });
  }
}

// ADMIN ONLY
export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  try {
    const body = await readJson(request);

    const product = await store.products.create({
      name: str(body.name, "Name", { max: 120 }),
      urlId: str(body.urlId, "URL id", { max: 140, pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ }),
      brand: str(body.brand, "Brand", { max: 60 }),
      category: str(body.category, "Category", { max: 60 }),
      gender: oneOf(body.gender, "Gender", GENDERS),
      description: str(body.description, "Description", { max: 2000 }),
      price: num(body.price, "Price", { min: 0, max: 100_000 }),
      stock: num(body.stock, "Stock", { min: 0, max: 1_000_000, integer: true }),
      size: strList(body.size, "Sizes"),
      imageUrl: httpUrl(body.imageUrl, "Image URL"),
    });

    return NextResponse.json(
      { message: "Product created", product },
      { status: 201 }
    );

  } catch (error) {

    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (error instanceof StoreConflictError) {
      return NextResponse.json(
        { message: "Product with this name already exists" },
        { status: 409 }
      );
    }

    console.log(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );

  }
}
