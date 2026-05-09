import { products } from "@repo/db/data";

import { FilteredProducts }
from "@/components/Product/FilteredProducts";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {

  const { brand } = await params;

  const filteredProducts = products.filter(
    (product) =>
      product.brand.toLowerCase() ===
      brand.toLowerCase()
  );

  return (
    <FilteredProducts
      title={brand}
      products={filteredProducts}
    />
  );
}