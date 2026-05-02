import { AppLayout } from "@/components/Layout/AppLayout";
import { client } from "@repo/db/client";
import { BlogDetail } from "@/components/Blog/Detail";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ urlId: string }>;
}) {
  const { urlId } = await params;

  // increment views in DB
  await client.db.post.update({
    where: { urlId },
    data: { views: { increment: 1 } },
  });

  // fetch post with like count
  const post = await client.db.post.findUnique({
    where: { urlId, active: true },
    include: { _count: { select: { Likes: true } } },
  });

  const postWithLikes = post
    ? { ...post, likes: post._count.Likes }
    : undefined;

  return (
    <AppLayout>
      {postWithLikes ? (
        <BlogDetail post={postWithLikes} />
      ) : (
        <div>Not found</div>
      )}
    </AppLayout>
  );
}