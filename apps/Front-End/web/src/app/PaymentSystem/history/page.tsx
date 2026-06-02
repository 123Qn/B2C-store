"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type OrderItem = {
  id: number;
  quantity: number;
  size: string;
  price: number;
  product: {
    id: number;
    name: string;
    imageUrl: string;
  };
};

type Order = {
  id: number;
  totalPrice: number;
  createdAt: string;
  items: OrderItem[];
};

// AUTH FETCH HELPER
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

  // AUTH CHECK + LOAD ORDERS TOGETHER
  useEffect(() => {
    async function init() {
      try {
        const token = localStorage.getItem("auth_token");

        if (!token) {
          router.push("/SessionManagement/login");
          return;
        }

        const authRes = await authFetch("/api/auth/check");

        if (!authRes.ok) {
          router.push("/SessionManagement/login");
          return;
        }

        // LOAD ORDERS
        const res = await authFetch("/api/orders");

        if (!res.ok) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const text = await res.text();
        if (!text) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const data: Order[] = JSON.parse(text);
        setOrders(data);

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
    return (
      <div className="flex items-center justify-center h-[70vh] text-2xl font-semibold">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition">
          ← Back to Home
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold">Order History</h1>
        <p className="text-gray-500 mt-2">Review your previous purchases</p>
      </div>

      {orders.length === 0 ? (
        <div className="border rounded-2xl p-14 text-center bg-white shadow-sm">
          <div className="text-5xl mb-4">📦</div>
          <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
          <p className="text-gray-500">Your completed orders will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col">
              <div className="flex justify-between items-start border-b pb-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold">Order #{order.id}</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase">Total</p>
                  <p className="text-xl font-bold">${order.totalPrice}</p>
                </div>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto max-h-[350px] pr-1">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{item.product.name}</h3>
                      <div className="flex gap-2 mt-1 text-xs text-gray-500">
                        <span>{item.size}</span>
                        <span>× {item.quantity}</span>
                      </div>
                    </div>
                    <p className="font-bold text-sm">${item.price * item.quantity}</p>
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