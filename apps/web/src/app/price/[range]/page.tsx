import {
  Product,
  products,
} from "@repo/db/data";

import { FilteredProducts }
from "@/components/Product/FilteredProducts";

export default async function PricePage({
  params,
}: {
  params: Promise<{
    range: string;
  }>;
}) {

  const { range } =
    await params;

  let filteredProducts:
    Product[] = [];

  // UNDER 50
  if (range === "under-50") {

    filteredProducts =
      products.filter(
        (product) =>
          product.price < 50
      );
  }

  // 50 - 100
  else if (
    range === "From-50-100"
  ) {

    filteredProducts =
      products.filter(
        (product) =>

          product.price >= 50 &&

          product.price <= 100
      );
  }

  // 100 - 200
  else if (
    range === "From-100-200"
  ) {

    filteredProducts =
      products.filter(
        (product) =>

          product.price >= 100 &&

          product.price <= 200
      );
  }

  // ABOVE 200
  else if (
    range === "over-200"
  ) {

    filteredProducts =
      products.filter(
        (product) =>
          product.price > 200
      );
  }
const formattedTitle =
  range
    .replaceAll("-", " ")
    .replaceAll("under", "Under $")
    .replaceAll("over", "Over $")
    .replaceAll("From 50 ", "From 50 to")
    .replaceAll("From 100 ", "From 100 to");
  return (

    <FilteredProducts
      title={formattedTitle}
      products={filteredProducts}
    />
  );
}