import type { Post } from "@repo/db/data";

export function BlogListItem({ post }: { post: Post }) {
  const cleanTitle = post.title.replace(/[^\w\s,]/g, "");

  return (
    <article data-testid={`blog-post-${post.id}`}>
      {/* Title */}
      <a href={`/post/${post.urlId}`}>
        {cleanTitle}
      </a>

      {/* Category */}
      <div>{post.category}</div>

      {/* Tags */}
      <div>
        {post.tags.split(",").map((tag) => (
          <span key={tag}>#{tag.trim()}</span>
        ))}
      </div>

      {/* Date */}
      <div>
        {new Date(post.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </div>

      {/* Views */}
      <div>{post.views} views</div>

      {/* Likes */}
      <div>{post.likes} likes</div>
    </article>
  );
}