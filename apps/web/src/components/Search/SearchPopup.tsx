import Link from "next/link";
import Image from "next/image";

import type { Product }
from "@prisma/client";

export function SearchPopup({
  products,
}: {
  products: Product[];
}) {

  // NO PRODUCTS
  if (products.length === 0) {

    return (

      <div className="absolute top-16 left-0 w-full bg-white rounded-2xl shadow-2xl p-6 z-50">

        No products found

      </div>

    );

  }

  return (

    <div className="absolute top-16 left-0 w-full bg-white rounded-2xl shadow-2xl p-4 z-50 max-h-[500px] overflow-y-auto">

      {/* TITLE */}
      <h2 className="font-bold text-lg mb-4">
        Product Results
      </h2>

      {/* PRODUCTS */}
      <div className="flex flex-col gap-4">

        {products.map((product) => (

          <Link
            key={product.id}
            href={`/products/${product.urlId}`}
            className="flex items-center gap-4 hover:bg-gray-100 p-3 rounded-xl transition"
          >

            {/* IMAGE */}
            <div className="relative w-20 h-20 shrink-0">

              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />

            </div>

            {/* INFO */}
            <div>

              <h3 className="font-semibold">
                {product.name}
              </h3>

              <p className="text-gray-500 text-sm">
                ${product.price}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </div>

  );

}