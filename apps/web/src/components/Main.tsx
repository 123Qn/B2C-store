"use client";

import { useState } from "react";

import { ProductList } from "./Product/List";

import { products } from "@repo/db/data";

export function Main({
  className,
}: {
  className?: string;
}) {

  const [gender, setGender] =
    useState("All");

  const [category, setCategory] =
    useState("All");

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
              border
              rounded-xl
              px-4 py-2
              bg-white
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
              border
              rounded-xl
              px-4 py-2
              bg-white
            "
          >

            <option value="All">
              All Category
            </option>

            <option value="Shirt">
              Shirt
            </option>

            <option value="Hoodie">
              Hoodie
            </option>

            <option value="Pants">
              Pants
            </option>

            <option value="Shoes">
              Shoes
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