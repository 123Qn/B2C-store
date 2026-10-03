//get all products
import { NextResponse,NextRequest} from "next/server";

import { store, StoreConflictError } from "@repo/db/store";

export async function GET() {

  const products =
    await store.products.list({ activeOnly: true });

  return NextResponse.json(products);

}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const product = await store.products.create({
        name: body.name,
        urlId: body.urlId,
        brand: body.brand,
        category: body.category,
        gender: body.gender,
        description: body.description,
        price: body.price,
        stock: body.stock,
        size: body.size,
        imageUrl: body.imageUrl,
    });

    return NextResponse.json(
      { message: "Product created", product },
      { status: 201 }
    );

  } catch (error: any) {

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