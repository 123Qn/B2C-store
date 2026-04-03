import type { Post } from "@repo/db/data";
import { marked } from "marked";//md-hml

export async function BlogDetail({ post }: { post: Post }) {
  const content = await marked.parse(post.content);

  return (
    <article data-testid={`blog-post-${post.id}`}>
      <h1>
        <a href={`/post/${post.urlId}`}>{post.title}</a>
      </h1>

      <span>{post.category}</span>
      <span>{post.date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
      
      {post.tags.split(",").map((tag) => (
        <a key={tag} href={`/tags/${tag}`}>#{tag}</a>
      ))}

      <span>{post.views} views</span>
      <span>{post.likes} likes</span>

      <div
        data-testid="content-markdown"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}