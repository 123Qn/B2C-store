"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/components/Cart/CartContext";
import { EmptyCart } from "@/components/Cart/EmptyCart";
import { CartItemCard } from "@/components/Cart/CartItemCard";
import { CartSummary } from "@/components/Cart/CartSummary";
import { cartStyles as s } from "@/styles/cart";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) router.push("/SessionManagement/login");
  }, [router]);

  async function handleCheckout() {
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart, totalPrice }),
      });

      if (!res.ok) { alert("Checkout failed"); return; }
      router.push("/PaymentSystem/payment");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  }

  return (
    <div className={s.page}>
      <div className={s.inner}>

        {/* HEADER */}
        <div className={s.header}>
          <Link href="/" className={s.backLink}>← Continue Shopping</Link>
          <h1 className={s.title}>Shopping Cart</h1>
          <p className={s.count}>{cart.length} item{cart.length !== 1 ? "s" : ""} in your cart</p>
        </div>

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className={s.grid}>

            {/* CART ITEMS */}
            <div className={s.itemsList}>
              {cart.map((item) => (
                <div key={item.id + item.selectedSize} className={s.itemWrapper}>
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
              <div className={s.summaryInner}>
                <CartSummary totalPrice={totalPrice} handleCheckout={handleCheckout} />
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}