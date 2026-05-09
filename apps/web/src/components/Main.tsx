"use client";

import { useState } from "react";

import { ProductList } from "./Product/List";

import { products } from "@repo/db/data";

export function Main({
  className,
}: {
  className?: string;
}) {

  const [gender, setGender] = useState("All");

  const filteredProducts = products.filter((product) => {

    return gender === "All"
      ? true
      : product.gender === gender;

  });

  return (
    <main className={className}>

      {/* Top Filter */}
      <section className="px-6 pt-8">

        <div className="flex justify-end">

          <select
            value={gender}
            onChange={(e) =>
              setGender(e.target.value)
            }
            className="
              border
              rounded-xl
              px-4 py-2
              bg-white
            "
          >

            <option value="All">
              All
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

        </div>

      </section>

      {/* Product Section */}
      <section className="px-6 py-12">

        <ProductList
          products={filteredProducts}
        />

      </section>

    </main>
  );
}