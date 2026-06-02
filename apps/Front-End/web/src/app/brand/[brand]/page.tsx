import { client } from "@repo/db/client";
import { FilteredProducts } from "@/components/Product/FilteredProducts";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;

  const filteredProducts = await client.db.product.findMany({
    where: {
      brand: {
        equals: brand,
        mode: "insensitive",
      },
    },
  });

  return (
    <FilteredProducts
      title={brand}
      products={filteredProducts}
    />
  );
}