import { store } from "@repo/db/store";
import { FilteredProducts } from "@/components/Product/FilteredProducts";
import { safeDecode } from "@/lib/format";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const decodedCategory = safeDecode(category);

  const filteredProducts = await store.products.list({
    activeOnly: true,
    category: decodedCategory,
  });

  return (
    <FilteredProducts
      eyebrow="Category"
      title={decodedCategory}
      products={filteredProducts}
    />
  );
}
