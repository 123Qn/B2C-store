import { Product, products } from "@repo/db/data";

import { FilteredProducts }
from "@/components/Product/FilteredProducts";

export default async function PricePage({
  params,
}: {
  params: Promise<{ range: string }>;
}) {

  const { range } = await params;

  let filteredProducts: Product[] = [];

  if (range === "under-50") {
    filteredProducts = products.filter(
      (product) => product.price < 50
    );
  }

  return (
    <FilteredProducts
      title={range}
      products={filteredProducts}
    />
  );
}