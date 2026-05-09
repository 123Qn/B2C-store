"use client";

import Image from "next/image";

import { useCart } from "@/components/Cart/Cart";
import Link from "next/link";

export default function CartPage() {

    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalPrice,
    } = useCart();

    return (
        <div className="max-w-6xl mx-auto px-8 py-12">
            <Link href="/" className="text-gray-500 hover:text-gray-700 mb-6 inline-block">
                ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-10">
                Shopping Cart
            </h1>

            {cart.length === 0 ? (

                <div className="text-gray-500 text-xl">
                    Your cart is empty
                </div>

            ) : (

                <div className="flex flex-col gap-6">

                    {cart.map((item) => (

                        <div
                            key={item.id}
                            className="
                flex items-center gap-6
                border rounded-2xl
                p-4
              "
                        >

                            {/* Image */}
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="
                  w-32 h-32
                  object-cover
                  rounded-xl
                "
                            />

                            {/* Info */}
                            <div className="flex-1">

                                <h2 className="text-2xl font-semibold">
                                    {item.name}
                                </h2>

                                <p className="text-gray-500">
                                    ${item.price}
                                </p>

                            </div>

                            {/* Quantity */}
                            <div className="flex items-center gap-3">

                                <button
                                    onClick={() =>
                                        decreaseQuantity(item.id)
                                    }
                                    className="
                    w-10 h-10
                    rounded-lg
                    bg-gray-200
                  "
                                >
                                    -
                                </button>

                                <span className="text-xl">
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        increaseQuantity(item.id)
                                    }
                                    className="
                    w-10 h-10
                    rounded-lg
                    bg-gray-200
                  "
                                >
                                    +
                                </button>

                            </div>

                            {/* Total */}
                            <div className="w-32 text-right">

                                <p className="font-bold text-xl">
                                    $
                                    {item.price * item.quantity}
                                </p>

                            </div>

                            {/* Remove */}
                            <button
                                onClick={() =>
                                    removeFromCart(item.id)
                                }
                                className="
                  text-red-500
                  hover:text-red-700
                "
                            >
                                Remove
                            </button>

                        </div>

                    ))}

                    {/* Bottom */}
                    <div
                        className="
              flex justify-between items-center
              mt-10
              border-t
              pt-6
            "
                    >

                        <h2 className="text-3xl font-bold">
                            Total Due:
                        </h2>

                        <div className="text-4xl font-bold">
                            ${totalPrice}
                        </div>

                    </div>

                    {/* Checkout */}
                    <div className="flex justify-end mt-6">

                        <button
                            className="
                px-8 py-4
                bg-black
                text-white
                rounded-2xl
                hover:bg-gray-800
                transition
              "
                        >
                            Proceed To Checkout
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}