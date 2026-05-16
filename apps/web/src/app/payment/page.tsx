"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/components/Cart/CartContext";

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
        const res = await fetch("/api/orders");

        if (!res.ok) {
          router.push("/cart");
          return;
        }

        const orders = await res.json();

        if (!orders || orders.length === 0) {
          router.push("/cart");
          return;
        }

        // LATEST ORDER
        setOrder(orders[0]);
      } catch (error) {
        console.log(error);

        router.push("/cart");
      }
    }

    loadLatestOrder();
  }, [router]);

  function handlePayment() {
    clearCart();

    router.push("/history");
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <h1 className="text-5xl font-bold mb-10">
        Payment
      </h1>

      <div className="bg-white border rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">
          Fake Payment Gateway
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Card Number"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="MM/YY"
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            <input
              placeholder="CVV"
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex justify-between mb-6">
            <span className="text-xl">
              Total
            </span>

            <span className="text-3xl font-bold">
              ${order.totalPrice}
            </span>
          </div>

          <button
            type="button"
            onClick={handlePayment}
            className="w-full py-4 bg-black text-white rounded-2xl text-lg font-semibold hover:bg-gray-800 transition"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}