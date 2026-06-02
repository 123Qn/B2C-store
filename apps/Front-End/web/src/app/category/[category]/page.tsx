import { client } from "@repo/db/client";
import { FilteredProducts } from "@/components/Product/FilteredProducts";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const filteredProducts = await client.db.product.findMany({
    where: {
      category: {
        equals: category,
        mode: "insensitive",
      },
    },
  });

  return (
    <FilteredProducts
      title={category}
      products={filteredProducts}
    />
  );
}