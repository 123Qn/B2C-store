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

  const query = q.trim();

  const filteredProducts =
    await client.db.product.findMany({
      where: {
        active: true,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { category: { contains: query, mode: "insensitive" } },
          { brand: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

  return (

    <FilteredProducts
      eyebrow={query ? "Search results for" : "Search"}
      title={query ? `“${query}”` : "All products"}
      products={filteredProducts}
    />

  );

}
