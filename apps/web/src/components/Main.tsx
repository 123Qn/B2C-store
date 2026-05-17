"use client";

import { useState }
from "react";

import type { Product }
from "@prisma/client";

import { ProductList }
from "./Product/List";

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

  // DYNAMIC CATEGORIES
  const categories = [

    "All",

    ...new Set(
      products.map(
        (product) =>
          product.category
      )
    ),

  ];

  // FILTER PRODUCTS
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

      {/* FILTERS */}
      <section className="px-4 md:px-6 pt-8">

        <div className="flex flex-col sm:flex-row justify-end gap-4">

          {/* GENDER */}
          <select
            value={gender}
            onChange={(e) =>
              setGender(
                e.target.value
              )
            }
            className="bg-[#FFF8F3] border border-[#B89B8A] rounded-2xl px-4 py-2 shadow-sm outline-none"
          >

            <option value="Unisex">
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

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="bg-[#FFF8F3] border border-[#B89B8A] rounded-2xl px-4 py-2 shadow-sm outline-none"
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

      {/* PRODUCTS */}
      <section className="px-4 md:px-6 py-12">

        <ProductList
          products={
            filteredProducts
          }
        />

      </section>

    </main>

  );

}