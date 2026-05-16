"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/components/Cart/CartContext";
import { EmptyCart } from "@/components/Cart/EmptyCart";
import { CartItemCard } from "@/components/Cart/CartItemCard";
import { CartSummary } from "@/components/Cart/CartSummary";

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
      const res = await fetch("/api/auth/check");

      if (!res.ok) {
        router.push("/SessionManagement/login");
      }
    }

    checkAuth();
  }, [router]);

  async function handleCheckout() {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          cart,
          totalPrice,
        }),
      });

      if (!res.ok) {
        alert("Checkout failed");
        return;
      }

      router.push("/PaymentSystem/payment");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* HEADER */}
        <div className="mb-8 lg:mb-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm sm:text-base text-gray-600 hover:text-black transition"
          >
            ← Continue Shopping
          </Link>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 text-black">
            Shopping Cart
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col xl:grid xl:grid-cols-[1fr_380px] gap-8">
            
            {/* CART ITEMS */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {cart.map((item) => (
                <div
                  key={item.id + item.selectedSize}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <CartItemCard
                    item={item}
                    removeFromCart={removeFromCart}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                  />
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="xl:sticky xl:top-24 h-fit">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6">
                <CartSummary
                  totalPrice={totalPrice}
                  handleCheckout={handleCheckout}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}