"use client";

import { useMemo, useState } from "react";
import type { Product } from "@prisma/client";
import { ProductList } from "./Product/List";
import { mainStyles as s } from "@/styles/main";

type MainProps = {
  className?: string;
  products: Product[];
};

type SortOption = "newest" | "price-asc" | "price-desc" | "popular";

const SORTERS: Record<SortOption, (a: Product, b: Product) => number> = {
  newest: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  popular: (a, b) => b.sold - a.sold,
};

export function Main({ className, products }: MainProps) {
  const [gender, setGender] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("newest");

  const genders = useMemo(
    () => ["All", ...new Set(products.map((p) => p.gender).filter(Boolean))],
    [products]
  );

  const categories = useMemo(
    () => ["All", ...[...new Set(products.map((p) => p.category))].sort((a, b) => a.localeCompare(b))],
    [products]
  );

  const filteredProducts = useMemo(
    () =>
      products
        .filter((product) => {
          const genderMatch = gender === "All" || product.gender === gender;
          const categoryMatch = category === "All" || product.category === category;
          return genderMatch && categoryMatch;
        })
        .sort(SORTERS[sort]),
    [products, gender, category, sort]
  );

  return (
    <div className={className}>

      {/* HEADER + FILTERS */}
      <div className={s.header}>
        <div>
          <h2 className={s.title}>Shop the collection</h2>
          <p className={s.count}>
            {filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className={s.filterRow}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={s.filterSelect}
            aria-label="Filter by category"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className={s.filterSelect}
            aria-label="Sort products"
          >
            <option value="newest">Newest</option>
            <option value="popular">Best selling</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* GENDER CHIPS */}
      <div className={s.chipRow}>
        {genders.map((g) => (
          <button
            key={g}
            onClick={() => setGender(g)}
            className={gender === g ? s.chipActive : s.chip}
            aria-pressed={gender === g}
          >
            {g}
          </button>
        ))}
      </div>

      {/* PRODUCTS — key resets pagination when filters change */}
      <ProductList key={`${gender}|${category}|${sort}`} products={filteredProducts} />

    </div>
  );
}
