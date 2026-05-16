import { FilteredProducts }
from "@/components/Product/FilteredProducts";

import { client }
from "@repo/db/client";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {

  const { q = "" } =
    await searchParams;

  const filteredProducts =
    await client.db.product.findMany({

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

    <FilteredProducts
      title={`Search: ${q}`}
      products={filteredProducts}
    />

  );

}