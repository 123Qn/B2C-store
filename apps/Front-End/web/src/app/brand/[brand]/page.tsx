import { client } from "@repo/db/client";
import { FilteredProducts } from "@/components/Product/FilteredProducts";
import { safeDecode } from "@/lib/format";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {

  const { brand } = await params;

  const decodedBrand =
    safeDecode(brand);

  const filteredProducts =
    await client.db.product.findMany({
      where: {
        active: true,
        brand: {
          equals: decodedBrand,
          mode: "insensitive",
        },
      },
      orderBy: { createdAt: "desc" },
    });

  return (
    <FilteredProducts
      eyebrow="Brand"
      title={decodedBrand}
      products={filteredProducts}
    />
  );

}
