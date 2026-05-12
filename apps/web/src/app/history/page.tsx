"use client";

import {
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { useRouter }
from "next/navigation";
import { L } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";

type Order = {
  id: number;

  items: any[];

  total: number;

  createdAt: string;
};

export default function HistoryPage() {

  const router = useRouter();

  const [orders, setOrders] =
    useState<Order[]>([]);

  // AUTH CHECK
  useEffect(() => {

    async function checkAuth() {

      const res = await fetch(
        "/api/auth/check"
      );

      if (!res.ok) {
        router.push("/login");
      }
    }

    checkAuth();

  }, [router]);

  // LOAD ORDERS
  useEffect(() => {

    const storedOrders =
      JSON.parse(
        localStorage.getItem("orders") ||
        "[]"
      );

    setOrders(storedOrders);

  }, []);

  return (

    <div className="max-w-7xl mx-auto px-6 py-10">
 <div>
    <Link
      href="/"
      className="text-sm text-gray-500 hover:text-gray-700 transition"
    >
      ← Back to Home
    </Link>
  </div>

      {/* Title */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Order History
        </h1>

        <p className="text-gray-500 mt-2">
          Review your previous purchases
        </p>

      </div>

      {/* Empty */}
      {orders.length === 0 ? (

        <div className="border rounded-2xl p-14 text-center bg-white shadow-sm">

          <div className="text-5xl mb-4">
            📦
          </div>

          <h2 className="text-2xl font-bold mb-2">
            No Orders Yet
          </h2>

          <p className="text-gray-500">
            Your completed orders will appear here
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col"
            >

              {/* Header */}
              <div className="flex justify-between items-start border-b pb-4 mb-4">

                <div>

                  <h2 className="text-lg font-bold">
                    #{order.id}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-xs text-gray-400 uppercase">
                    Total
                  </p>

                  <p className="text-xl font-bold">
                    ${order.total}
                  </p>

                </div>

              </div>

              {/* Items */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[350px] pr-1">

                {order.items.map((item) => (

                  <div
                    key={
                      item.id +
                      item.selectedSize
                    }
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                  >

                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg shrink-0"
                    />

                    <div className="flex-1 min-w-0">

                      <h3 className="font-semibold text-sm truncate">
                        {item.name}
                      </h3>

                      <div className="flex gap-2 mt-1 text-xs text-gray-500">

                        <span>
                          {item.selectedSize}
                        </span>

                        <span>
                          ×{item.quantity}
                        </span>

                      </div>

                    </div>

                    <p className="font-bold text-sm">
                      $
                      {item.price *
                        item.quantity}
                    </p>

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