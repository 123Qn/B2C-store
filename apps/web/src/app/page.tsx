import { client } from "@repo/db/client";
import { AppLayout } from "../components/Layout/AppLayout";
import { Main } from "../components/Main";
import styles from "./page.module.css";

export default async function Home() {
  const prisma = client.db;

  const rawPosts = await prisma.post.findMany({
    where: { active: true },
    orderBy: { date: "desc" },
    include: { Likes: true }
  });

  const posts = rawPosts.map(p => ({
    ...p,
    likes: p.Likes.length
  }));

  return (
    <AppLayout>
      <Main posts={posts} className={styles.main} />
    </AppLayout>
  );
}