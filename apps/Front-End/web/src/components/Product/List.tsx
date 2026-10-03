"use client";

import { useState } from "react";
import type { Product } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ProductListItem } from "./ListItem";
import { productStyles as s } from "@/styles/product";

const ITEMS_PER_PAGE = 9;

export function ProductList({ products }: { products: Product[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const currentProducts = products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  function goTo(number: number) {
    setPage(number);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (products.length === 0) {
    return (
      <div className={s.emptyList}>
        <p className={s.emptyListTitle}>0 Products</p>
        <p className={s.emptyListDesc}>Nothing matches here yet. Try another category or search.</p>
      </div>
    );
  }

  return (
    <div>
      <div className={s.listGrid}>
        {currentProducts.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className={s.pagination} aria-label="Pagination">
          <button
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 1}
            className={s.pageArrow}
          >
            <ChevronLeftIcon className="h-4 w-4" /> Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => goTo(number)}
              className={currentPage === number ? s.pageActive : s.pageInactive}
              aria-current={currentPage === number ? "page" : undefined}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={s.pageArrow}
          >
            Next <ChevronRightIcon className="h-4 w-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
