import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { client } from "@repo/db/client";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const raw = await client.db.post.findMany({
    where: { active: true },
    include: { _count: { select: { Likes: true } } },
  });

  const posts = raw
    .filter((p) => {
      if (!p.tags) return false;
      const tagList = p.tags.split(",").map((t) => t.trim().toLowerCase().replace(/\s+/g, "-"));
      return tagList.includes(name.toLowerCase());
    })
    .map((p) => ({ ...p, likes: p._count.Likes }));

  return (
    <AppLayout query={name}>
      <Main posts={posts} />
    </AppLayout>
  );
}