import { isLoggedIn } from "../../../utils/auth";
import { client } from "@repo/db/client";
import LoginScreen from "../../LoginScreen";
import UpdateForm from "../../UpdateForm";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ urlId: string }>;
}) {
  const loggedIn = await isLoggedIn();
  if (!loggedIn) return <LoginScreen />;

  const { urlId } = await params;
  const post = await client.db.post.findUnique({ where: { urlId } });
  if (!post) redirect("/");

  return <UpdateForm post={post} />;
}