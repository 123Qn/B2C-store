"use client";

import type { Product } from "@prisma/client";

import Link from "next/link";
import { useState } from "react";

export function ProductListItem({
  product,
}: {
  product: Product;
}) {

  const [added, setAdded] = useState(false);

  const sizes =
    typeof product.size === "string"
      ? product.size
          .split(",")
          .map((s) => s.trim())
      : [];

  const imageSrc =
    product.imageUrl?.trim()
      ? product.imageUrl
      : "https://picsum.photos/500";

  return (

    <article
      className="rounded-3xl overflow-hidden bg-white shadow-lg hover:-translate-y-1 hover:shadow-2xl transition duration-300"
    >

      {/* Product Image */}
      <Link href={`/products/${product.urlId}`}>

        <img
          src={imageSrc}
          alt={product.name || "Product"}
          className="w-full h-80 object-cover hover:scale-105 transition duration-300"
        />

      </Link>

      {/* Product Content */}
      <div className="p-5">

        {/* Category */}
        <p className="text-sm text-gray-500 mb-2">
          {product.category}
        </p>

        {/* Product Name */}
        <Link
          href={`/products/${product.urlId}`}
          className="text-lg font-semibold text-gray-900 hover:text-black transition"
        >
          {product.name}
        </Link>

        {/* Sizes */}
        <div className="flex items-center mt-2 space-x-2">

          {sizes.map((size) => (

            <span
              key={size}
              className="px-2 py-1 border border-gray-300 rounded text-sm text-gray-600"
            >
              {size}
            </span>

          ))}

        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Price + Sold */}
        <div className="flex items-center justify-between mt-5">

          <span className="text-2xl font-bold text-black">
            ${product.price}
          </span>

          <span className="text-sm text-gray-500">
            {product.sold} sold
          </span>

        </div>

      </div>

    </article>

  );

}