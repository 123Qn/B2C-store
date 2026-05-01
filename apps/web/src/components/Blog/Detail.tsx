import type { Post } from "@repo/db/data";
import { marked } from "marked";
import { LikeButton } from "./LikeButton";

export async function BlogDetail({ post }: { post: Post }) {
  const content = await marked.parse(post.content ?? "");

  return (
    <article data-testid={`blog-post-${post.id}`} className="max-w-3xl mx-auto px-6 py-8">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
        <a href={`/post/${post.urlId}`} className="hover:underline">
          {post.title}
        </a>
      </h1>

      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
          {post.category}
        </span>
        <span>
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.split(",").map((tag) => {
          const trimmed = tag.trim();
          const urlTag = trimmed.toLowerCase().replace(/\s+/g, "-");
          return (
            <a key={trimmed} href={`/tags/${urlTag}`} className="text-blue-500 text-sm hover:underline">
              #{trimmed}
            </a>
          );
        })}
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 border-b pb-4 mb-6">
        <span>{post.views} views</span>
        <LikeButton postId={post.id} initialLikes={post.likes} />
      </div>

      <div
        data-testid="content-markdown"
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}