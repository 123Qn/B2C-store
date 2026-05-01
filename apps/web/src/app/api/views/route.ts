import { client } from "@repo/db/client"

export async function POST(req: Request) {
  const { urlId } = await req.json()

  await client.db.post.update({
    where: { urlId },
    data: { views: { increment: 1 } },
  })

  return Response.json({ ok: true })
}