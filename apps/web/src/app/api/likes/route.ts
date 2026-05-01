// apps/web/src/app/api/likes/route.ts
import { client } from "@repo/db/client";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const { postId } = await req.json();
  const headersList = await headers();
  const userIP = headersList.get("x-forwarded-for") ?? "unknown";

  const existing = await client.db.like.findUnique({
    where: { postId_userIP: { postId, userIP } },
  });

  if (existing) {
    await client.db.like.delete({
      where: { postId_userIP: { postId, userIP } },
    });
  } else {
    await client.db.like.create({
      data: { postId, userIP },
    });
  }

  const count = await client.db.like.count({ where: { postId } });
  return Response.json({ likes: count });
}