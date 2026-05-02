import { isLoggedIn } from "../../../utils/auth";
import LoginScreen from "../../LoginScreen";
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
  redirect(`/posts/${urlId}`);
}