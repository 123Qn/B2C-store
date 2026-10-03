import { client } from "@repo/db/client";
import { FilteredProducts } from "@/components/Product/FilteredProducts";
import { safeDecode } from "@/lib/format";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const decodedCategory = safeDecode(category);

  const filteredProducts = await client.db.product.findMany({
    where: {
      active: true,
      category: {
        equals: decodedCategory,
        mode: "insensitive",
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <FilteredProducts
      eyebrow="Category"
      title={decodedCategory}
      products={filteredProducts}
    />
  );
}
