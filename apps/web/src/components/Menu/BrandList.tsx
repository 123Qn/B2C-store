import Link from "next/link";

import { client } from "@repo/db/client";

export async function BrandList() {

  const products =
    await client.db.product.findMany();

  const brands = [

    ...new Set(
      products.map(
        (product) =>
          product.brand
      )
    ),

  ];

  return (

    <div className="flex flex-col gap-3">

      {brands.map((brand) => (

        <Link
          key={brand}
          href={`/brand/${brand.toLowerCase()}`}
          className="text-[#FFF8F3] hover:text-black transition"
        >
          {brand}
        </Link>

      ))}

    </div>

  );

}