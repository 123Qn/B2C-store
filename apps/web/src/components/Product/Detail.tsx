"use client";
import { useCart } from "../Cart/CartContext";
import type { Product } from "@repo/db/data";
import { useRouter } from "next/navigation";
import { useState } from "react";
export function ProductDetail({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] =
    useState(product.size[0]);
  const router = useRouter();
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Product Image */}
        <div>

          <img
            src={product.imageUrl}
            alt={product.name}
            className="
              w-full
              rounded-3xl
              object-cover
              shadow-lg
            "
          />

        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">

          <p className="text-gray-500 text-lg mb-2">
            {product.category}
          </p>

          <h1 className="text-5xl font-bold mb-6">
            {product.name}
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          {/*size*/}
          <div className="flex items-center mt-2 space-x-2 mb-8">
            {product.size.map((size) => (

              <button
                key={size}

                onClick={() => setSelectedSize(size)}

                className={`
      px-4
      py-2
      border
      rounded-xl
      transition

      ${selectedSize === size
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-600 hover:border-black"
                  }
    `}
              >
                {size}
              </button>

            ))}
          </div>

          <div className="flex items-center gap-6 mb-8">

            <span className="text-4xl font-bold">
              ${product.price}
            </span>

            <span className="text-gray-500">
              {product.sold} sold
            </span>

          </div>

          <div className="flex items-center gap-4 mb-8">

            <span className="text-gray-600">
              Stock:
            </span>

            <span className="font-semibold">
              {product.stock}
            </span>

          </div>

          {/* Buttons */}
          <div className="flex gap-4">

            <button
              onClick={() => {

                addToCart(product, selectedSize);

                router.push("/cart");

              }}
              className="
    px-8 py-4
    bg-black
    text-white
    rounded-2xl
    hover:bg-gray-800
    transition
  "
            >
              Add To Cart
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}