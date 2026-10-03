"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/components/Cart/CartContext";
import { paymentStyles as s } from "@/styles/payment";
import { formatPrice } from "@/lib/format";

type Order = {
  id: number;
  totalPrice: number;
  items?: { quantity: number }[];
};

// "4242424242424242" -> "4242 4242 4242 4242"
function formatCardNumber(value: string) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}

// "1226" -> "12/26"
function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

export default function PaymentPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    async function loadLatestOrder() {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) { router.push("/SessionManagement/login"); return; }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) { router.push("/PaymentSystem/cart"); return; }

        const orders = await res.json();
        if (!Array.isArray(orders) || orders.length === 0) { router.push("/PaymentSystem/cart"); return; }

        // orders come back newest first
        setOrder(orders[0]);
      } catch (error) {
        console.log(error);
        router.push("/PaymentSystem/cart");
      }
    }

    loadLatestOrder();
  }, [router]);

  function handlePayment() {
    if (paying) return;
    setPaying(true);
    clearCart();
    router.push("/PaymentSystem/history");
  }

  if (!order) {
    return <div className={s.loading}>Loading…</div>;
  }

  const itemCount = order.items?.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={s.page}>
      <div className={s.inner}>
        <Link href="/PaymentSystem/cart" className={s.backLink}>
          <ArrowLeftIcon className="h-4 w-4" /> Back to cart
        </Link>
        <h1 className={s.title}>Payment</h1>
        <p className={s.subtitle}>Complete your purchase securely</p>

        <div className={s.grid}>

          {/* CARD DETAILS */}
          <div className={s.card}>
            <div className={s.cardHeader}>
              <h2 className={s.cardTitle}>Card details</h2>
              <span className={s.demoBadge}>Demo — no real charge</span>
            </div>

            <div className={s.preview} aria-hidden>
              <span className="text-sm font-semibold tracking-wide">Q Card</span>
              <span className={s.previewNumber}>{cardNumber || "•••• •••• •••• ••••"}</span>
              <div className={s.previewRow}>
                <span>Expires {expiry || "MM/YY"}</span>
                <span>CVV {cvv ? "•".repeat(cvv.length) : "•••"}</span>
              </div>
            </div>

            <div className={s.inputWrapper}>
              <div>
                <label htmlFor="card-number" className={s.label}>Card number</label>
                <input
                  id="card-number"
                  placeholder="Card Number"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  className={s.input}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                />
              </div>
              <div className={s.inputRow}>
                <div>
                  <label htmlFor="card-expiry" className={s.label}>Expiry</label>
                  <input
                    id="card-expiry"
                    placeholder="MM/YY"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    className={s.input}
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  />
                </div>
                <div>
                  <label htmlFor="card-cvv" className={s.label}>CVV</label>
                  <input
                    id="card-cvv"
                    placeholder="CVV"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    className={s.input}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className={s.summary}>
            <h2 className={s.summaryTitle}>Summary</h2>
            <div className={s.summaryRow}>
              <span>Order</span>
              <span className={s.orderRef}>#{order.id}</span>
            </div>
            {itemCount !== undefined && (
              <div className={s.summaryRow}>
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
            )}
            <div className={s.summaryRow}>
              <span>Shipping</span>
              <span className="font-medium text-emerald-600">Free</span>
            </div>

            <div className={s.footer}>
              <div className={s.totalRow}>
                <span className={s.totalLabel}>Total</span>
                <span className={s.totalPrice}>{formatPrice(order.totalPrice)}</span>
              </div>
            </div>

            <button type="button" onClick={handlePayment} disabled={paying} className={s.payBtn}>
              <LockClosedIcon className="h-4 w-4" />
              Pay Now · {formatPrice(order.totalPrice)}
            </button>
            <p className={s.secureNote}>Payments are encrypted and secure</p>
          </div>

        </div>
      </div>
    </div>
  );
}
