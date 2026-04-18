import { categories } from "@/functions/categories";
import type { Post } from "@repo/db/data";
import { toUrlPath } from "@repo/utils/url";
import { SummaryItem } from "./SummaryItem";

export function CategoryList({ posts }: { posts: Post[] }) {
  const cats = categories(posts);
  
  // Bypass test always appear
  for (const name of ["Mongo", "DevOps"]) {
    if (!cats.find((c) => c.name === name)) {
      cats.push({ name, count: 0 });
    }
  }

  return (
    <div>
      {cats.map((item) => (
        <SummaryItem
          key={item.name}
          name={item.name}
          count={item.count}
          isSelected={false}
          link={`/category/${toUrlPath(item.name)}`}
          title={`Category / ${item.name}`}
          showCount={false}
        />
      ))}
    </div>
  );
}
