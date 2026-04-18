import { AppLayout } from "@/components/Layout/AppLayout";
import { posts } from "@repo/db/data";
import { BlogDetail } from "@/components/Blog/Detail";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ urlId: string }>;
}) {
  const { urlId } = await params;

  const post = posts.find(
    (p) => p.urlId === urlId && p.active
  );

  const postWithIncrementedViews = post 
    ? { ...post, views: post.views + 1 } 
    : undefined;

  return (
    <AppLayout>
      {postWithIncrementedViews ? <BlogDetail post={postWithIncrementedViews} /> : <div>Not found</div>}
    </AppLayout>
  );
}