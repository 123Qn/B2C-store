//get all products
import { NextResponse,NextRequest} from "next/server";

import { client } from "@repo/db/client";

export async function GET() {

  const products =
    await client.db.product.findMany(
      {
        where: { active: true },
      }
    );

  return NextResponse.json(products);

}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const product = await client.db.product.create({
      data: {
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
      },
    });

    return NextResponse.json({ message: "Product created", product }, { status: 201 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}