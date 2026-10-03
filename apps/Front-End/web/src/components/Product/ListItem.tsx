"use client";

import type { Product } from "@prisma/client";
import Link from "next/link";
import { productStyles as s } from "@/styles/product";
import { FALLBACK_IMAGE, formatPrice, getSizes } from "@/lib/format";

export function ProductListItem({ product }: { product: Product }) {
  const sizes = getSizes(product.size);
  const imageSrc = product.imageUrl?.trim() ? product.imageUrl : FALLBACK_IMAGE;
  const href = `/products/${product.urlId}`;
  const soldOut = product.stock <= 0;

  return (
    <article className={s.itemCard}>
      <Link href={href} className={s.itemImageWrapper}>
        <img src={imageSrc} alt={product.name || "Product"} className={s.itemImage} loading="lazy" />
        {soldOut ? (
          <span className={s.itemBadgeOut}>Sold out</span>
        ) : product.brand ? (
          <span className={s.itemBadge}>{product.brand}</span>
        ) : null}
      </Link>
      <div className={s.itemContent}>
        <p className={s.itemCategory}>{product.category}</p>
        <Link href={href} className={s.itemName}>{product.name}</Link>
        <p className={s.itemDesc}>{product.description}</p>
        {sizes.length > 0 && (
          <div className={s.itemSizes}>
            {sizes.map((size) => (
              <span key={size} className={s.itemSize}>{size}</span>
            ))}
          </div>
        )}
        <div className={s.itemFooter}>
          <span className={s.itemPrice}>{formatPrice(product.price)}</span>
          <span className={s.itemSold}>{product.sold} sold</span>
        </div>
      </div>
    </article>
  );
}
