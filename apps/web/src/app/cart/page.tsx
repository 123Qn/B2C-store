"use client";

import { useEffect } from "react";

import Link from "next/link";

import { useRouter }
from "next/navigation";

import { useCart }
from "@/components/Cart/CartContext";

import { EmptyCart }
from "@/components/Cart/EmptyCart";

import { CartItemCard }
from "@/components/Cart/CartItemCard";

import { CartSummary }
from "@/components/Cart/CartSummary";

import { savePendingOrder }
from "@/components/Cart/checkout";

export default function CartPage() {

  const router = useRouter();

  const {

    cart,

    removeFromCart,

    increaseQuantity,

    decreaseQuantity,

    totalPrice,

  } = useCart();

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

  }, []);

  function handleCheckout() {

    savePendingOrder(
      cart,
      totalPrice
    );

    router.push("/payment");
  }

  return (

    <div className="max-w-7xl mx-auto px-8 py-12">

      {/* Header */}
      <div className="mb-10">

        <Link
          href="/"
          className="text-gray-500"
        >
          ← Continue Shopping
        </Link>

        <h1 className="text-5xl font-bold mt-4">
          Shopping Cart
        </h1>

      </div>

      {cart.length === 0 ? (

        <EmptyCart />

      ) : (

        <div className="grid grid-cols-[1fr_380px] gap-8">

          {/* LEFT */}
          <div className="flex flex-col gap-5">

            {cart.map((item) => (

              <CartItemCard
                key={
                  item.id +
                  item.selectedSize
                }

                item={item}

                removeFromCart={
                  removeFromCart
                }

                increaseQuantity={
                  increaseQuantity
                }

                decreaseQuantity={
                  decreaseQuantity
                }
              />

            ))}

          </div>

          {/* RIGHT */}
          <CartSummary
            totalPrice={totalPrice}
            handleCheckout={
              handleCheckout
            }
          />

        </div>

      )}

    </div>
  );
}