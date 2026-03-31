import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { posts } from "@repo/db/data";

export default async function Page({
  params,
}: {
   params: Promise<{ name: string }>;
}) {
  const { name } = await params;

 const filteredPosts = posts.filter((p) => {
  if (!p.active) return false;
  if (!p.tags) return false;

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