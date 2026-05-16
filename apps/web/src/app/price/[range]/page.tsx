import { client } from "@repo/db/client";

import { FilteredProducts } from "@/components/Product/FilteredProducts";

import type { Product } from "@prisma/client";

export default async function PricePage({
  params,
}: {
  params: Promise<{
    range: string;
  }>;
}) {
  const { range } = await params;

  let filteredProducts: Product[] = [];

  // UNDER 50
  if (range === "under-50") {
    filteredProducts =
      await client.db.product.findMany({
        where: {
          price: {
            lt: 50,
          },
        },
      });
  }

  // 50 - 100
  else if (
    range === "From-50-100"
  ) {
    filteredProducts =
      await client.db.product.findMany({
        where: {
          price: {
            gte: 50,
            lte: 100,
          },
        },
      });
  }

  // 100 - 200
  else if (
    range === "From-100-200"
  ) {
    filteredProducts =
      await client.db.product.findMany({
        where: {
          price: {
            gte: 100,
            lte: 200,
          },
        },
      });
  }

  // OVER 200
  else if (
    range === "over-200"
  ) {
    filteredProducts =
      await client.db.product.findMany({
        where: {
          price: {
            gt: 200,
          },
        },
      });
  }

  const formattedTitle = range
    .replaceAll("-", " ")
    .replaceAll("under", "Under $")
    .replaceAll("over", "Over $")
    .replaceAll(
      "From 50 ",
      "From 50 to "
    )
    .replaceAll(
      "From 100 ",
      "From 100 to "
    );

  return (
    <FilteredProducts
      title={formattedTitle}
      products={filteredProducts}
    />
  );
}