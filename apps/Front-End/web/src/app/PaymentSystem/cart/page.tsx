"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { useCart } from "@/components/Cart/CartContext";
import { EmptyCart } from "@/components/Cart/EmptyCart";
import { CartItemCard } from "@/components/Cart/CartItemCard";
import { CartSummary } from "@/components/Cart/CartSummary";
import { cartStyles as s } from "@/styles/cart";

export default function CartPage() {
  const router = useRouter();
  const {
    cart, removeFromCart, increaseQuantity, decreaseQuantity,
    totalPrice, totalItems, hydrated,
  } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) router.push("/SessionManagement/login");
  }, [router]);

  async function handleCheckout() {
    if (submitting || cart.length === 0) return;

    const token = localStorage.getItem("auth_token");
    if (!token) { router.push("/SessionManagement/login"); return; }

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart, totalPrice }),
      });

      if (res.status === 401) { router.push("/SessionManagement/login"); return; }
      if (!res.ok) { setError("Checkout failed. Please try again."); return; }
      router.push("/PaymentSystem/payment");
    } catch (error) {
      console.log(error);
      setError("Server error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={s.page}>
      <div className={s.inner}>

        {/* HEADER */}
        <div className={s.header}>
          <Link href="/" className={s.backLink}>
            <ArrowLeftIcon className="h-4 w-4" /> Continue Shopping
          </Link>
          <h1 className={s.title}>Shopping Cart</h1>
          {hydrated && cart.length > 0 && (
            <p className={s.count}>{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>
          )}
        </div>

        {!hydrated ? (
          <div className={s.loading}>Loading cart…</div>
        ) : cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className={s.grid}>

            {/* CART ITEMS */}
            <div className={s.itemsList}>
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className={s.itemWrapper}>
                  <CartItemCard
                    item={item}
                    removeFromCart={removeFromCart}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                  />
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className={s.summaryWrapper}>
              <CartSummary
                totalPrice={totalPrice}
                totalItems={totalItems}
                handleCheckout={handleCheckout}
                loading={submitting}
                error={error}
              />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
