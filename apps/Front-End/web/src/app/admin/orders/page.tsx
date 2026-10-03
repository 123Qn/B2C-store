"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { statusClass } from "@/styles/history";
import { FALLBACK_IMAGE, formatDate, formatPrice } from "@/lib/format";
import { authHeaders } from "@/lib/auth";
import { AdminGuard } from "@/components/Admin/AdminGuard";

type AdminOrder = {
  id: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  user?: { email?: string };
  items: {
    id: number;
    size: string | null;
    quantity: number;
    price: number;
    product: { name: string; imageUrl: string };
  }[];
};

// the API only returns orders to admins, so the token is sent from the browser
async function getOrders(): Promise<AdminOrder[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/all`, {
    cache: "no-store",
    headers: authHeaders(),
  });
  if (res.status === 401 || res.status === 403) throw new Error("Your admin session has expired. Please log in again.");
  if (!res.ok) throw new Error("Could not load orders.");
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default function AdminOrdersPage() {
  return (
    <AdminGuard>
      <AdminOrders />
    </AdminGuard>
  );
}

function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  const revenue = orders.reduce((total, order) => total + order.totalPrice, 0);
  const units = orders.reduce(
    (total, order) => total + order.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-stone-500 transition hover:text-ink">
          <ArrowLeftIcon className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Orders</h1>
        <p className="mb-8 mt-1 text-stone-500">All purchase records</p>

        {/* STATS */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Purchases", value: String(orders.length) },
            { label: "Revenue", value: formatPrice(revenue) },
            { label: "Units sold", value: String(units) },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-400">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold tabular-nums">{stat.value}</p>
            </div>
          ))}
        </div>

        {error && (
          <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>
        )}

        {loading ? (
          <div className="py-20 text-center text-stone-400">Loading…</div>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-20 text-center text-stone-500">
            No purchases yet
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {orders.map((order) => (
              <div key={order.id} className="overflow-hidden rounded-3xl border border-stone-200 bg-white">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-100 bg-stone-50/60 px-6 py-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-semibold">Order #{order.id}</h2>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-stone-500">{formatDate(order.createdAt)}</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-stone-600">
                      <UserCircleIcon className="h-4 w-4" /> {order.user?.email ?? "Unknown customer"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wider text-stone-400">Total</p>
                    <p className="text-2xl font-semibold tabular-nums">{formatPrice(order.totalPrice)}</p>
                  </div>
                </div>
                <div className="divide-y divide-stone-100 px-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 py-3">
                      <img src={item.product.imageUrl || FALLBACK_IMAGE} alt={item.product.name} className="h-12 w-12 rounded-lg bg-stone-100 object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{item.product.name}</p>
                        <p className="text-xs text-stone-500">Size: {item.size ?? "-"} × {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold tabular-nums">{formatPrice(item.price * item.quantity)}</p>
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
