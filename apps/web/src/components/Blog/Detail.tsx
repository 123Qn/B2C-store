import type { Post } from "@repo/db/data";
import { marked } from "marked";

export async function BlogDetail({ post }: { post: Post }) {
  const content = await marked.parse(post.content);

  return (
    <article data-testid={`blog-post-${post.id}`}>
      Detail
    </article>
  );
}
