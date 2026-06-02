"use client";

import type { Product } from "@prisma/client";
import Link from "next/link";
import { productStyles as s } from "@/styles/product";

export function ProductListItem({ product }: { product: Product }) {
  const sizes = typeof product.size === "string"
    ? (product.size as string).split(",").map((s) => s.trim())
    : [];
  const imageSrc = product.imageUrl?.trim() ? product.imageUrl : "/asset/image/wsulo.png";

  return (
    <article className={s.itemCard}>
      <Link href={`/products/${product.urlId}`}>
        <img src={imageSrc} alt={product.name || "Product"} className={s.itemImage} />
      </Link>
      <div className={s.itemContent}>
        <p className={s.itemCategory}>{product.category}</p>
        <Link href={`/products/${product.urlId}`} className={s.itemName}>{product.name}</Link>
        <div className={s.itemSizes}>
          {sizes.map((size) => (
            <span key={size} className={s.itemSize}>{size}</span>
          ))}
        </div>
        <p className={s.itemDesc}>{product.description}</p>
        <div className={s.itemFooter}>
          <span className={s.itemPrice}>${product.price}</span>
          <span className={s.itemSold}>{product.sold} sold</span>
        </div>
      </div>
    </article>
  );
}