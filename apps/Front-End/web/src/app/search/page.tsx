import { FilteredProducts }
from "@/components/Product/FilteredProducts";

import { store }
from "@repo/db/store";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {

  const { q = "" } =
    await searchParams;

  const query = q.trim();

  const filteredProducts =
    await store.products.list({
      activeOnly: true,
      search: query,
    });

  return (

    <FilteredProducts
      eyebrow={query ? "Search results for" : "Search"}
      title={query ? `“${query}”` : "All products"}
      products={filteredProducts}
    />

  );

}
