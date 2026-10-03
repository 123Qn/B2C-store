"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArchiveBoxIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { historyStyles as s, statusClass } from "@/styles/history";
import { FALLBACK_IMAGE, formatDate, formatPrice } from "@/lib/format";

type OrderItem = {
  id: number;
  quantity: number;
  size: string;
  price: number;
  product: { id: number; name: string; imageUrl: string; urlId?: string };
};

type Order = {
  id: number;
  totalPrice: number;
  status?: string;
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

        const checkRes = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`);
        if (!checkRes.ok) { router.push("/SessionManagement/login"); return; }

        const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`);
        if (!res.ok) { setOrders([]); return; }

        const text = await res.text();
        const data = text ? JSON.parse(text) : [];
        setOrders(Array.isArray(data) ? data : []);
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

  const totalSpent = orders.reduce((total, order) => total + order.totalPrice, 0);

  return (
    <div className={s.page}>
      <div className={s.inner}>
        <Link href="/" className={s.backLink}>
          <ArrowLeftIcon className="h-4 w-4" /> Back to Home
        </Link>

        <div className={s.header}>
          <div>
            <h1 className={s.title}>Order History</h1>
            <p className={s.subtitle}>Review your previous purchases</p>
          </div>
          {orders.length > 0 && (
            <p className={s.stats}>
              {orders.length} order{orders.length !== 1 ? "s" : ""} · {formatPrice(totalSpent)} total
            </p>
          )}
        </div>

        {orders.length === 0 ? (
          <div className={s.empty}>
            <div className={s.emptyIcon}>
              <ArchiveBoxIcon className="h-8 w-8" />
            </div>
            <h2 className={s.emptyTitle}>No Orders Yet</h2>
            <p className={s.emptyDesc}>Your completed orders will appear here</p>
            <Link href="/" className={s.emptyBtn}>Start Shopping</Link>
          </div>
        ) : (
          <div className={s.grid}>
            {orders.map((order) => (
              <div key={order.id} className={s.orderCard}>

                {/* ORDER HEADER */}
                <div className={s.orderHeader}>
                  <div className={s.orderHeaderLeft}>
                    <h2 className={s.orderId}>Order #{order.id}</h2>
                    <p className={s.orderDate}>{formatDate(order.createdAt)}</p>
                    {order.status && (
                      <span className={`${s.status} ${statusClass(order.status)}`}>
                        {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                      </span>
                    )}
                  </div>
                  <div className={s.orderTotalRight}>
                    <p className={s.orderTotalLabel}>Total</p>
                    <p className={s.orderTotalPrice}>{formatPrice(order.totalPrice)}</p>
                  </div>
                </div>

                {/* ORDER ITEMS */}
                <div className={s.itemsList}>
                  {order.items.map((item) => (
                    <div key={item.id} className={s.itemRow}>
                      <img src={item.product.imageUrl || FALLBACK_IMAGE} alt={item.product.name} className={s.itemImage} />
                      <div className={s.itemInfo}>
                        {item.product.urlId ? (
                          <Link href={`/products/${item.product.urlId}`}>
                            <h3 className={s.itemName}>{item.product.name}</h3>
                          </Link>
                        ) : (
                          <h3 className={s.itemName}>{item.product.name}</h3>
                        )}
                        <div className={s.itemMeta}>
                          {item.size && <span>Size {item.size}</span>}
                          <span>Qty {item.quantity}</span>
                          <span>{formatPrice(item.price)} each</span>
                        </div>
                      </div>
                      <p className={s.itemPrice}>{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
