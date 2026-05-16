import { AppLayout } from "@/components/Layout/AppLayout";
import { ProductList } from "@/components/Product/List";

import { client } from "@repo/db/client";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  const filteredProducts = await client.db.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },

        {
          category: {
            contains: q,
            mode: "insensitive",
          },
        },

        {
          brand: {
            contains: q,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-8">
          Search: {q}
        </h1>

        <ProductList
          products={filteredProducts}
        />
      </div>
    </AppLayout>
  );
}