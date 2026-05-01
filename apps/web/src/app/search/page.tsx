import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { client } from "@repo/db/client";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  const raw = await client.db.post.findMany({
    where: {
      active: true,
      OR: [
        { title: { contains: q } },
        { description: { contains: q } },
      ],
    },
    include: { _count: { select: { Likes: true } } },
  });

  const posts = raw.map((p) => ({ ...p, likes: p._count.Likes }));

  return (
    <AppLayout query={q}>
      <Main posts={posts} />
    </AppLayout>
  );
}