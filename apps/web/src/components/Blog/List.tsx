import type { Post } from "@repo/db/data";
import { BlogListItem } from "./ListItem";

export function BlogList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <div>0 Posts</div>;
  }

return (
    <div className="py-6">
      {posts.map((post) => {
        const cleanTitle = post.title.replace(/[^\w\s]/g, "");

        return (
          <div key={post.id}>
            <div>{cleanTitle}</div>

            <BlogListItem post={post} />
          </div>
        );
      })}
    </div>
  );
}

export default BlogList;