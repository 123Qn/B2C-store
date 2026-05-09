"use client";

import { useEffect } from "react";

import { useCart } from "@/components/Cart/Cart";

import Link from "next/link";

import { useRouter } from "next/navigation";

export default function CartPage() {

    const router = useRouter();

    useEffect(() => {

        async function checkAuth() {

            const res = await fetch("/api/auth/check");

            if (!res.ok) {
                router.push("/login");
            }

        }

        checkAuth();

    }, []);

    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalPrice,
    } = useCart();

    return (

        <div className="max-w-7xl mx-auto px-8 py-12">

            {/* Header */}
            <div className="mb-10">

                <Link
                    href="/"
                    className="
                        text-gray-500
                        hover:text-black
                        transition
                        text-sm
                    "
                >
                    ← Continue Shopping
                </Link>

                <h1 className="text-5xl font-bold mt-4">
                    Shopping Cart
                </h1>

                <p className="text-gray-500 mt-2 text-lg">
                    {cart.length} item(s) in your cart
                </p>

            </div>

            {cart.length === 0 ? (

                <div
                    className="
                        flex flex-col
                        items-center
                        justify-center
                        py-32
                        border
                        rounded-3xl
                        bg-white
                    "
                >

                    <div className="text-7xl mb-6">
                        🛒
                    </div>

                    <h2 className="text-3xl font-bold mb-3">
                        Your cart is empty
                    </h2>

                    <p className="text-gray-500 mb-8">
                        Add some products to continue shopping
                    </p>

                    <Link
                        href="/"
                        className="
                            px-8
                            py-4
                            bg-black
                            text-white
                            rounded-2xl
                            hover:bg-gray-800
                            transition
                        "
                    >
                        Browse Products
                    </Link>

                </div>

            ) : (

                <div className="grid grid-cols-[1fr_380px] gap-8 items-start">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col gap-5">

                        {cart.map((item) => (

                            <div
                                key={item.id}
                                className="
                                    bg-white
                                    rounded-3xl
                                    p-5
                                    shadow-sm
                                    border
                                    flex items-center
                                    gap-6
                                    hover:shadow-md
                                    transition
                                "
                            >

                                {/* Image */}
                                <div
                                    className="
                                        w-32
                                        h-32
                                        rounded-2xl
                                        overflow-hidden
                                        bg-gray-100
                                        shrink-0
                                    "
                                >

                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                        "
                                    />

                                </div>

                                {/* Info */}
                                <div className="flex-1">

                                    <h2 className="text-2xl font-semibold">
                                        {item.name}
                                    </h2>

                                    <p className="text-gray-500 mt-2">
                                        Premium Fashion Collection
                                    </p>

                                    <p className="text-xl font-bold mt-4">
                                        ${item.price}
                                    </p>

                                </div>

                                {/* Quantity */}
                                <div
                                    className="
                                        flex items-center
                                        bg-gray-100
                                        rounded-2xl
                                        overflow-hidden
                                    "
                                >

                                    <button
                                        onClick={() =>
                                            decreaseQuantity(item.id)
                                        }
                                        className="
                                            w-12
                                            h-12
                                            text-xl
                                            hover:bg-gray-200
                                            transition
                                        "
                                    >
                                        -
                                    </button>

                                    <span
                                        className="
                                            w-12
                                            text-center
                                            font-semibold
                                        "
                                    >
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increaseQuantity(item.id)
                                        }
                                        className="
                                            w-12
                                            h-12
                                            text-xl
                                            hover:bg-gray-200
                                            transition
                                        "
                                    >
                                        +
                                    </button>

                                </div>

                                {/* Price */}
                                <div className="text-right min-w-[120px]">

                                    <p className="text-sm text-gray-400 mb-1">
                                        Total
                                    </p>

                                    <p className="text-2xl font-bold">
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
                                        text-gray-400
                                        hover:text-red-500
                                        transition
                                        text-xl
                                    "
                                >
                                    ✕
                                </button>

                            </div>

                        ))}

                    </div>

                    {/* RIGHT SIDE */}
                    <div
                        className="
                            bg-white
                            rounded-3xl
                            shadow-sm
                            border
                            p-8
                            sticky
                            top-10
                        "
                    >

                        <h2 className="text-3xl font-bold mb-8">
                            Order Summary
                        </h2>

                        <div className="space-y-5 mb-8">

                            <div className="flex justify-between text-gray-500">

                                <span>Subtotal</span>

                                <span>${totalPrice}</span>

                            </div>

                            <div className="flex justify-between text-gray-500">

                                <span>Shipping</span>

                                <span>Free</span>

                            </div>

                            <div className="border-t pt-5 flex justify-between">

                                <span className="text-xl font-semibold">
                                    Total
                                </span>

                                <span className="text-3xl font-bold">
                                    ${totalPrice}
                                </span>

                            </div>

                        </div>

                        <button
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
                            Proceed To Checkout
                        </button>

                        <div className="mt-6 text-center text-sm text-gray-400">
                            Secure Checkout 🔒
                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}