"use client";

import { useState }
from "react";

import type { Product }
from "@prisma/client";

import { ProductListItem }
from "./ListItem";

export function ProductList({
  products,
}: {
  products: Product[];
}) {

  const ITEMS_PER_PAGE = 6;

  const [page, setPage] =
    useState(1);

  const totalPages =
    Math.ceil(
      products.length /
      ITEMS_PER_PAGE
    );

  const start =
    (page - 1) *
    ITEMS_PER_PAGE;

  const end =
    start +
    ITEMS_PER_PAGE;

  const currentProducts =
    products.slice(
      start,
      end
    );

  // NO PRODUCTS
  if (products.length === 0) {

    return (

      <div className="text-center py-20 text-gray-500 text-xl">

        0 Products

      </div>

    );

  }

  return (

    <div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {currentProducts.map((product) => (

          <ProductListItem
            key={product.id}
            product={product}
          />

        ))}

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center flex-wrap gap-3 mt-12">

        {Array.from(
          { length: totalPages },
          (_, i) => i + 1
        ).map((number) => (

          <button
            key={number}
            onClick={() => {

              setPage(number);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });

            }}
            className={`
              px-4 py-2 rounded-xl border transition

              ${
                page === number

                  ? "bg-black text-white border-black"

                  : "bg-white hover:bg-gray-100"
              }
            `}
          >

            {number}

          </button>

        ))}

      </div>

    </div>

  );

}