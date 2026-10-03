import { AppLayout } from "../components/Layout/AppLayout";
import { Hero } from "../components/Layout/Hero";
import { Main } from "../components/Main";
import { store } from "@repo/db/store";

export const dynamic = "force-dynamic";

export default async function Home() {

  const products =
    await store.products.list({ activeOnly: true });

  return (

    <AppLayout>

      <Hero />

      <Main products={products} />

    </AppLayout>

  );

}
