import { NextRequest, NextResponse } from "next/server";
import { client } from "@repo/db/client";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // TRY BY urlId 
    const product = await client.db.product.findUnique({
      where: { urlId: id },
    });

    if (!product) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const product = await client.db.product.update({
      where: { id: Number(id) },
      data: { active: body.active },
    });

    return NextResponse.json({ message: "Updated", product });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204 });
}