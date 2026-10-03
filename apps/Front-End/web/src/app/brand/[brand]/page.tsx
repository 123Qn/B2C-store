import { store } from "@repo/db/store";
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
    await store.products.list({
      activeOnly: true,
      brand: decodedBrand,
    });

  return (
    <FilteredProducts
      eyebrow="Brand"
      title={decodedBrand}
      products={filteredProducts}
    />
  );

}
