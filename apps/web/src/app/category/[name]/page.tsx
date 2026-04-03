import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { posts } from "@repo/db/data";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
// dyrout
  const { name } = await params;

  const filteredPosts = posts.filter(
    (p) =>
      p.active &&
      p.category.toLowerCase() === name.toLowerCase()
  );

  return (
    <AppLayout>
      <Main posts={filteredPosts} />
    </AppLayout>
  );
}