"use client";

import { useState } from "react";
import type { Product } from "@prisma/client";
import { ProductListItem } from "./ListItem";
import { productStyles as s } from "@/styles/product";

export function ProductList({ products }: { products: Product[] }) {
  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentProducts = products.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (products.length === 0) {
    return <div className={s.emptyList}>0 Products</div>;
  }

  return (
    <div>
      <div className={s.listGrid}>
        {currentProducts.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>

      <div className={s.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => { setPage(number); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className={page === number ? s.pageActive : s.pageInactive}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}