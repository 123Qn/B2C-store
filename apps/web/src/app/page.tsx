import { AppLayout } from "../components/Layout/AppLayout";
import { Main } from "../components/Main";
import { client } from "@repo/db/client";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function Home() {
   console.log("DB URL:", process.env.DATABASE_URL)
  const raw = await client.db.post.findMany({
    where: { active: true },
    orderBy: { date: "desc" },
    include: { _count: { select: { Likes: true } } },  
  });

  const posts = raw.map((p) => ({ ...p, likes: p._count.Likes }));

  return (
    <AppLayout>
      <Main posts={posts} className={styles.main} />
    </AppLayout>
  );
}