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

  return (
    <AppLayout>
      {post ? <BlogDetail post={post} /> : <div>Not found</div>}
    </AppLayout>
  );
}