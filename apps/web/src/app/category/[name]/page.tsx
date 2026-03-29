import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { posts } from "@repo/db/data";

export default function Page({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;

 const  filteredPosts = posts.filter(
  (p) => p.active && p.category.toLowerCase() === name
);
  return (
    <AppLayout>
      <Main posts={filteredPosts} />
    </AppLayout>
  );
}