import { AppLayout } from "@/components/Layout/AppLayout";
import { posts } from "@repo/db/data";

export default async function Page({
  params,
}: {
  params: Promise<{ urlId: string }>;
}) {
  const { urlId } = await params;

  const post = posts.find((p) => p.urlId === urlId);

  if (!post) {
    return <AppLayout>Article not found</AppLayout>;
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-4">
          {post.title}
        </h1>

        <div className="text-sm text-gray-500 mb-4">
          {new Date(post.date).toLocaleDateString()}
        </div>

        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full rounded-xl mb-6"
        />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {post.content}
        </p>

      </div>
    </AppLayout>
  );
}