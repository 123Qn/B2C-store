"use client";

import { useCart } from "../Cart/CartContext";
import type { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { productStyles as s } from "@/styles/product";

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const sizes = product.size ? String(product.size).split(",").map((s) => s.trim()) : [];
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "M");

  return (
    <div className={s.detailWrapper}>
      <div className={s.detailGrid}>

        {/* IMAGE */}
        <div>
          <img src={product.imageUrl} alt={product.name} className={s.detailImage} />
        </div>

        {/* INFO */}
        <div className={s.detailInfo}>
          <p className={s.detailCategory}>{product.category}</p>
          <h1 className={s.detailTitle}>{product.name}</h1>
          <p className={s.detailDesc}>{product.description}</p>

          {/* SIZES */}
          <div className={s.sizeWrapper}>
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={selectedSize === size ? s.sizeActive : s.sizeInactive}
              >
                {size}
              </button>
            ))}
          </div>

          {/* PRICE */}
          <div className={s.priceWrapper}>
            <span className={s.price}>${product.price}</span>
            <span className={s.sold}>{product.sold} sold</span>
          </div>

          {/* STOCK */}
          <div className={s.stockWrapper}>
            <span className={s.stockLabel}>Stock:</span>
            <span className={s.stockValue}>{product.stock}</span>
          </div>

          {/* BUTTONS */}
          <div className={s.btnWrapper}>
            <button
              onClick={() => { addToCart(product, selectedSize); alert("Cart Added"); }}
              className={s.addToCartBtn}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}