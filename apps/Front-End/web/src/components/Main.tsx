"use client";

import { useState } from "react";
import type { Product } from "@prisma/client";
import { ProductList } from "./Product/List";
import { mainStyles as s } from "@/styles/main";

type MainProps = {
  className?: string;
  products: Product[];
};

export function Main({ className, products }: MainProps) {
  const [gender, setGender] = useState("All");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const genderMatch = gender === "All" ? true : product.gender === gender;
    const categoryMatch = category === "All" ? true : product.category === category;
    return genderMatch && categoryMatch;
  });

  return (
    <main className={className}>

      {/* FILTERS */}
      <section className={s.filterSection}>
        <div className={s.filterRow}>

          {/* GENDER */}
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={s.filterSelect}
          >
            <option value="Unisex">All Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Teen">Teen</option>
            <option value="Kids">Kids</option>
          </select>

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={s.filterSelect}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

        </div>
      </section>

      {/* PRODUCTS */}
      <section className={s.productSection}>
        <ProductList products={filteredProducts} />
      </section>

    </main>
  );
}