"use client";

import { useState } from "react";

import type { Product } from "@prisma/client";

import { ProductList}  from "./Product/List";

type MainProps = {
  className?: string;
  products: Product[];
};

export function Main({
  className,
  products,
}: MainProps) {

  const [gender, setGender] =
    useState("All");

  const [category, setCategory] =
    useState("All");

  // Dynamic categories
  const categories = [

    "All",

    ...new Set(
      products.map(
        (product) => product.category
      )
    ),

  ];

  const filteredProducts =
    products.filter((product) => {

      const genderMatch =

        gender === "All"

          ? true

          : product.gender === gender;

      const categoryMatch =

        category === "All"

          ? true

          : product.category === category;

      return (
        genderMatch &&
        categoryMatch
      );

    });

  return (

    <main className={className}>

      {/* Filters */}
      <section className="px-6 pt-8">

        <div className="flex justify-end gap-4">

          {/* Gender */}
          <select
            value={gender}
            onChange={(e) =>
              setGender(e.target.value)
            }
            className="
              bg-[#FFF8F3]
              border
              border-[#B89B8A]
              rounded-2xl
              px-4 py-2
              shadow-sm
            "
          >

            <option value="All">
              All Gender
            </option>

            <option value="Men">
              Men
            </option>

            <option value="Women">
              Women
            </option>

            <option value="Teen">
              Teen
            </option>

            <option value="Kids">
              Kids
            </option>

          </select>

          {/* Category */}
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="
              bg-[#FFF8F3]
              border
              border-[#B89B8A]
              rounded-2xl
              px-4 py-2
              shadow-sm
            "
          >

            {categories.map((cat) => (

              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>

            ))}

          </select>

        </div>

      </section>

      {/* Products */}
      <section className="px-6 py-12">

        <ProductList
          products={filteredProducts}
        />

      </section>

    </main>

  );

}