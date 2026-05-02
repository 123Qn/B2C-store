import { NextResponse } from "next/server";
import { client } from "@repo/db/client";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const post = await client.db.post.update({
    where: { id: Number(id) },
    data: body,
  });
  return NextResponse.json(post);
}