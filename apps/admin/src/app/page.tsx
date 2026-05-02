import { isLoggedIn } from "../utils/auth";
import LoginScreen from "./LoginScreen";
import ListScreen from "./ListScreen";
import { client } from "@repo/db/client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const loggedIn = await isLoggedIn();
  if (!loggedIn) return <LoginScreen />;

  const raw = await client.db.post.findMany({
    orderBy: { date: "desc" },
    include: { _count: { select: { Likes: true } } },
  });

  const posts = raw.map(p => ({ ...p, likes: p._count.Likes }));

  return <ListScreen initialPosts={posts} />;
}