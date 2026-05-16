"use client";

import { useCart }
from "../Cart/CartContext";

import type { Product }
from "@prisma/client";

import { useRouter }
from "next/navigation";

import { useState }
from "react";

export function ProductDetail({
  product,
}: {
  product: Product;
}) {

  const { addToCart } =
    useCart();

  const router =
    useRouter();

  const sizes =
    product.size
      ? String(product.size)
          .split(",")
          .map((s) => s.trim())
      : [];

  const [
    selectedSize,
    setSelectedSize,
  ] = useState(
    sizes[0] || "M"
  );

  return (

    <div
      className="
        max-w-7xl
        mx-auto
        px-4
        md:px-8
        py-8
        md:py-12
      "
    >

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-8
          lg:gap-12
        "
      >

        {/* PRODUCT IMAGE */}
        <div>

          <img
            src={product.imageUrl}
            alt={product.name}
            className="
              w-full
              rounded-3xl
              object-cover
              shadow-lg
              max-h-[700px]
            "
          />

        </div>

        {/* PRODUCT INFO */}
        <div
          className="
            flex
            flex-col
            justify-center
          "
        >

          {/* CATEGORY */}
          <p
            className="
              text-gray-500
              text-sm
              md:text-lg
              mb-2
            "
          >
            {product.category}
          </p>

          {/* TITLE */}
          <h1
            className="
              text-3xl
              md:text-5xl
              font-bold
              mb-6
            "
          >
            {product.name}
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              text-gray-600
              text-base
              md:text-lg
              leading-relaxed
              mb-8
            "
          >
            {product.description}
          </p>

          {/* SIZES */}
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
              mb-8
            "
          >

            {sizes.map((size) => (

              <button
                key={size}
                onClick={() =>
                  setSelectedSize(size)
                }
                className={`
                  px-4
                  py-2
                  border
                  rounded-xl
                  transition

                  ${
                    selectedSize === size

                      ? `
                        bg-black
                        text-white
                        border-black
                      `

                      : `
                        border-gray-300
                        text-gray-600
                        hover:border-black
                      `
                  }
                `}
              >

                {size}

              </button>

            ))}

          </div>

          {/* PRICE */}
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-4
              md:gap-6
              mb-8
            "
          >

            <span
              className="
                text-3xl
                md:text-4xl
                font-bold
              "
            >
              ${product.price}
            </span>

            <span className="text-gray-500">
              {product.sold} sold
            </span>

          </div>

          {/* STOCK */}
          <div
            className="
              flex
              items-center
              gap-4
              mb-8
            "
          >

            <span className="text-gray-600">
              Stock:
            </span>

            <span className="font-semibold">
              {product.stock}
            </span>

          </div>

          {/* BUTTONS */}
          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-4
            "
          >

            <button
              onClick={() => {

                addToCart(
                  product,
                  selectedSize
                );

                router.push(
                  "/PaymentSystem/cart"
                );

              }}

              className="
                w-full
                sm:w-auto
                px-8
                py-4
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