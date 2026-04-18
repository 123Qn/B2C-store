// import { posts, type Post } from "../components/data";

export function categories(
  posts: { category: string; active: boolean }[],
): { name: string; count: number //1
                                }[] 
//ftsig
{
  return posts
    .filter((p) => p.active) 
    .sort((a, b) => a.category.localeCompare(b.category))
    .reduce(
      (acc, post) => { //2
        const category = acc.find((c) => c.name === post.category);
        if (category) {
          category.count++;
        } else {
          acc.push({ name: post.category, count: 1 });
        }
        return acc;
      },
      [] as { name: string; count: number }[],
    );
}
