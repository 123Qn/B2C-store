"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter }
from "next/navigation";

import { useCart }
from "@/components/Cart/CartContext";

export default function PaymentPage() {

  const router = useRouter();

  const { clearCart } =
    useCart();

  const [order, setOrder] =
    useState<any>(null);

  useEffect(() => {

    const pending =
      localStorage.getItem(
        "pendingOrder"
      );

    if (!pending) {

      router.push("/cart");

      return;
    }

    setOrder(
      JSON.parse(pending)
    );

  }, []);

  function handlePayment() {

    const orders =
      JSON.parse(
        localStorage.getItem("orders") ||
        "[]"
      );

    orders.push(order);

    localStorage.setItem(

      "orders",

      JSON.stringify(orders)
    );

    localStorage.removeItem(
      "pendingOrder"
    );

    clearCart();

    router.push("/history");
  }

  if (!order) return null;

  return (

    <div className="max-w-4xl mx-auto px-8 py-12">

      <h1 className="text-5xl font-bold mb-10">
        Payment
      </h1>

      <div
        className="
          bg-white
          border
          rounded-3xl
          p-8
          shadow-sm
        "
      >

        <h2 className="text-2xl font-bold mb-6">
          Fake Payment Gateway
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Card Number"
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              placeholder="MM/YY"
              className="
                border
                rounded-xl
                px-4
                py-3
              "
            />

            <input
              placeholder="CVV"
              className="
                border
                rounded-xl
                px-4
                py-3
              "
            />

          </div>

        </div>

        <div className="border-t mt-8 pt-8">

          <div className="flex justify-between mb-6">

            <span className="text-xl">
              Total
            </span>

            <span className="text-3xl font-bold">
              ${order.total}
            </span>

          </div>

          <button
            onClick={handlePayment}
            className="
              w-full
              py-4
              bg-black
              text-white
              rounded-2xl
              text-lg
              font-semibold
              hover:bg-gray-800
              transition
            "
          >
            Pay Now
          </button>

        </div>

      </div>

    </div>
  );
}