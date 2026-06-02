import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminHomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (token !== "admin") {
    redirect("/login");
  }

  return (
    <main className="p-6">
      <h1>Admin of Full Stack Blog</h1>
    </main>
  );
}