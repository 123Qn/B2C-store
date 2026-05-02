import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { client } from "@repo/db/client";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const { year, month } = await params;

  const raw = await client.db.post.findMany({
    where: { active: true },
    include: { _count: { select: { Likes: true } } },
  });

  const posts = raw
    .filter((p) => {
      const d = new Date(p.date);
      return (
        d.getFullYear().toString() === year &&
        (d.getMonth() + 1).toString() === month
      );
    })
    .map((p) => ({ ...p, likes: p._count.Likes }));

  return (
    <AppLayout>
      <Main posts={posts} />
    </AppLayout>
  );
}