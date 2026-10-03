import { FilteredProducts }
from "@/components/Product/FilteredProducts";

import { store }
from "@repo/db/store";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {

  const { q = "" } =
    await searchParams;

  // ?q=a&q=b arrives as an array
  const query = (Array.isArray(q) ? q[0] ?? "" : q).trim().slice(0, 100);

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
