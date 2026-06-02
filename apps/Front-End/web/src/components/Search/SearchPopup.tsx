import Link from "next/link";

import type { Product }
from "@prisma/client";

export function SearchPopup({
  products,
}: {
  products: Product[];
}) {

  if (products.length === 0) {

    return (

      <div
        className="
          absolute top-16 left-0 w-full
          bg-white rounded-2xl shadow-2xl
          p-6 z-50
        "
      >
        No products found
      </div>

    );

  }

  return (

    <div
      className="
        absolute top-16 left-0 w-full
        bg-white
        p-4 z-50
        max-h-[500px]
        overflow-y-auto
      "
    >

      <h2 className="font-bold text-lg mb-4">
        Product Results
      </h2>

      <div className="flex flex-col gap-4">

        {products.map((product) => (

          <Link
            key={product.id}
            href={`/products/${product.urlId}`}
            className="
              flex items-center gap-4
              hover:bg-gray-100
              p-3 rounded-xl
              transition
            "
          >

            <img
              src={product.imageUrl}
              alt={product.name}
              className="
                w-20
                h-20
                object-cover
                rounded-lg
              "
            />

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