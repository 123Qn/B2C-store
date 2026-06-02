"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { historyStyles as s } from "@/styles/history";

type OrderItem = {
  id: number;
  quantity: number;
  size: string;
  price: number;
  product: { id: number; name: string; imageUrl: string };
};

type Order = {
  id: number;
  totalPrice: number;
  createdAt: string;
  items: OrderItem[];
};

function authFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("auth_token");
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
}

export default function HistoryPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) { router.push("/SessionManagement/login"); return; }

        const authRes = await authFetch("/api/auth/check");
        if (!authRes.ok) { router.push("/SessionManagement/login"); return; }

        const res = await authFetch("/api/orders");
        if (!res.ok) { setOrders([]); setLoading(false); return; }

        const text = await res.text();
        if (!text) { setOrders([]); setLoading(false); return; }

        setOrders(JSON.parse(text));
      } catch (error) {
        console.log(error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [router]);

  if (loading) {
    return <div className={s.loading}>Loading Orders...</div>;
  }

  return (
    <div className={s.page}>
      <div>
        <Link href="/" className={s.backLink}>← Back to Home</Link>
      </div>

      <div className={s.header}>
        <h1 className={s.title}>Order History</h1>
        <p className={s.subtitle}>Review your previous purchases</p>
      </div>

      {orders.length === 0 ? (
        <div className={s.empty}>
          <div className={s.emptyIcon}>📦</div>
          <h2 className={s.emptyTitle}>No Orders Yet</h2>
          <p className={s.emptyDesc}>Your completed orders will appear here</p>
        </div>
      ) : (
        <div className={s.grid}>
          {orders.map((order) => (
            <div key={order.id} className={s.orderCard}>

              {/* ORDER HEADER */}
              <div className={s.orderHeader}>
                <div>
                  <h2 className={s.orderId}>Order #{order.id}</h2>
                  <p className={s.orderDate}>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className={s.orderTotalRight}>
                  <p className={s.orderTotalLabel}>Total</p>
                  <p className={s.orderTotalPrice}>${order.totalPrice}</p>
                </div>
              </div>

              {/* ORDER ITEMS */}
              <div className={s.itemsList}>
                {order.items.map((item) => (
                  <div key={item.id} className={s.itemRow}>
                    <img src={item.product.imageUrl} alt={item.product.name} className={s.itemImage} />
                    <div className={s.itemInfo}>
                      <h3 className={s.itemName}>{item.product.name}</h3>
                      <div className={s.itemMeta}>
                        <span>{item.size}</span>
                        <span>× {item.quantity}</span>
                      </div>
                    </div>
                    <p className={s.itemPrice}>${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}