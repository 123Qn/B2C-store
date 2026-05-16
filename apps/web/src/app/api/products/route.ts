import { NextResponse } from "next/server";

import { client } from "@repo/db/client";

export async function GET() {

  const products =
    await client.db.product.findMany();

  return NextResponse.json(products);

}