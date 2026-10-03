import { AppLayout } from "../components/Layout/AppLayout";
import { Hero } from "../components/Layout/Hero";
import { Main } from "../components/Main";
import { client } from "@repo/db/client";

export const dynamic = "force-dynamic";

export default async function Home() {

  const products =
    await client.db.product.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });

  return (

    <AppLayout>

      <Hero />

      <Main products={products} />

    </AppLayout>

  );

}
