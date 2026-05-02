import { NextResponse } from "next/server";
import { client } from "@repo/db/client";

export async function POST(request: Request) {
  const body = await request.json();

  const urlId = body.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const post = await client.db.post.create({
    data: {
      title: body.title,
      description: body.description,
      content: body.content,
      imageUrl: body.imageUrl,
      tags: body.tags,
      category: body.category || "",
      urlId,
      date: new Date(),
      views: 0,
      active: true,
    },
  });

  return NextResponse.json(post);
}