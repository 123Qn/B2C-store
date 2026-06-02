"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/Cart/CartContext";
import { paymentStyles as s } from "@/styles/payment";

type Order = {
  id: number;
  totalPrice: number;
};

export default function PaymentPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function loadLatestOrder() {
      try {
        const token = localStorage.getItem("auth_token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) { router.push("/PaymentSystem/cart"); return; }

        const orders = await res.json();
        if (!orders || orders.length === 0) { router.push("/PaymentSystem/cart"); return; }

        setOrder(orders[0]);
      } catch (error) {
        console.log(error);
        router.push("/PaymentSystem/cart");
      }
    }

    loadLatestOrder();
  }, [router]);

  function handlePayment() {
    clearCart();
    router.push("/PaymentSystem/history");
  }

  if (!order) {
    return <div className={s.loading}>Loading...</div>;
  }

  return (
    <div className={s.page}>
      <h1 className={s.title}>Payment</h1>

      <div className={s.card}>
        <h2 className={s.cardTitle}>Fake Payment Gateway</h2>

        {/* INPUTS */}
        <div className={s.inputWrapper}>
          <input placeholder="Card Number" className={s.input} />
          <div className={s.inputRow}>
            <input placeholder="MM/YY" className={s.inputHalf} />
            <input placeholder="CVV" className={s.inputHalf} />
          </div>
        </div>

        {/* FOOTER */}
        <div className={s.footer}>
          <div className={s.totalRow}>
            <span className={s.totalLabel}>Total</span>
            <span className={s.totalPrice}>${order.totalPrice}</span>
          </div>
          <button type="button" onClick={handlePayment} className={s.payBtn}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}