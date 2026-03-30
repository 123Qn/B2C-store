// import { posts, type Post } from "../components/data";

export function tags(posts: { tags: string; active: boolean }[]) {
  const set = new Set<string>();

  for (const p of posts) {
    if (!p.active) continue;
    if (!p.tags) continue;

    const tagList = p.tags.split(",").map((t) => t.trim());

    for (const tag of tagList) {
      if (!tag) continue;

      set.add(tag);
    }
  }

  return Array.from(set)
    .map((name) => ({ name, count: 1 }))
    .sort((a, b) => a.name.localeCompare(b.name));
}