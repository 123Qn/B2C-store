"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@prisma/client";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../Cart/CartContext";
import { productStyles as s } from "@/styles/product";
import { FALLBACK_IMAGE, formatPrice, getSizes } from "@/lib/format";

const LOW_STOCK = 5;

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const sizes = getSizes(product.size);
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "M");
  const [added, setAdded] = useState(false);

  const soldOut = product.stock <= 0;
  const lowStock = !soldOut && product.stock <= LOW_STOCK;

  // HIDE CONFIRMATION AFTER A FEW SECONDS
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 3500);
    return () => clearTimeout(timer);
  }, [added]);

  function handleAddToCart() {
    if (soldOut) return;
    addToCart(product, selectedSize);
    setAdded(true);
  }

  return (
    <div className={s.detailWrapper}>
      <Link href="/" className={s.backLink}>
        <ArrowLeftIcon className="h-4 w-4" /> Back to shop
      </Link>

      <div className={s.detailGrid}>

        {/* IMAGE */}
        <div className={s.detailImageWrapper}>
          <img src={product.imageUrl || FALLBACK_IMAGE} alt={product.name} className={s.detailImage} />
        </div>

        {/* INFO */}
        <div className={s.detailInfo}>
          <div className={s.detailMeta}>
            <span className={s.detailBrand}>{product.brand}</span>
            <span className={s.detailCategory}>{product.category}</span>
          </div>
          <h1 className={s.detailTitle}>{product.name}</h1>

          {/* PRICE */}
          <div className={s.priceWrapper}>
            <span className={s.price}>{formatPrice(product.price)}</span>
            <span className={s.sold}>{product.sold} sold</span>
          </div>

          <p className={s.detailDesc}>{product.description}</p>

          <div className={s.divider} />

          {/* SIZES */}
          {sizes.length > 0 && (
            <div>
              <div className={s.sizeHeader}>
                <span className={s.sizeLabel}>Size</span>
                <span className={s.sizeSelected}>Selected: {selectedSize}</span>
              </div>
              <div className={s.sizeWrapper}>
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={selectedSize === size ? s.sizeActive : s.sizeInactive}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STOCK */}
          <div className={s.stockWrapper}>
            <span className={soldOut ? s.stockDotOut : lowStock ? s.stockDotLow : s.stockDotIn} />
            <span className={s.stockLabel}>
              {soldOut
                ? "Out of stock"
                : lowStock
                  ? `Only ${product.stock} left`
                  : `In stock (${product.stock} available)`}
            </span>
          </div>

          {/* BUTTONS */}
          <div className={s.btnWrapper}>
            <button
              onClick={handleAddToCart}
              disabled={soldOut}
              className={s.addToCartBtn}
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {soldOut ? "Sold Out" : "Add To Cart"}
            </button>

            {added && (
              <div className={s.toast} role="status">
                <span className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5" />
                  Added to your cart (size {selectedSize})
                </span>
                <Link href="/PaymentSystem/cart" className={s.toastLink}>View cart</Link>
              </div>
            )}
          </div>

          {/* PERKS */}
          <div className={s.perks}>
            <div className={s.perk}><TruckIcon className={s.perkIcon} /> Free delivery</div>
            <div className={s.perk}><ArrowPathIcon className={s.perkIcon} /> 30-day returns</div>
            <div className={s.perk}><ShieldCheckIcon className={s.perkIcon} /> Secure payment</div>
          </div>
        </div>
      </div>
    </div>
  );
}
