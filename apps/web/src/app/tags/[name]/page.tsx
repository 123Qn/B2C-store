import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { posts } from "@repo/db/data";

export default function Page({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;

  const filteredPosts = posts.filter((p) => {
    if (!p.active) return false;

    const tagList = p.tags
      .split(",")
      .map((t) => t.trim().toLowerCase());

    return tagList.includes(name.toLowerCase());
  });

  return (
    <AppLayout query={name}>
      <Main posts={filteredPosts} />
    </AppLayout>
  );
}