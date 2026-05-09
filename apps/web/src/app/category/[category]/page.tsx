import { products } from "@repo/db/data";

import { FilteredProducts }
from "@/components/Product/FilteredProducts";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {

  const { category } = await params;

  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase() ===
      category.toLowerCase()
  );

  return (
    <FilteredProducts
      title={category}
      products={filteredProducts}
    />
  );
}