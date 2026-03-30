import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { posts } from "@repo/db/data";

export default async function Page({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const { year, month } = await params;

  const filteredPosts = posts.filter((p) => {
    const d = new Date(p.date);

    return (
      p.active &&
      d.getFullYear().toString() === year &&
      (d.getMonth() + 1).toString() === month
    );
  });

  return (
    <AppLayout>
      <Main posts={filteredPosts} />
    </AppLayout>
  );
}