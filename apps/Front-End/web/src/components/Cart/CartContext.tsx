"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { Product }
from "@prisma/client";

import type {
  CartItem,
  CartContextType,
} from "./types";

import {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "./cartAction";

const CART_KEY = "cart";

const CartContext =
  createContext<CartContextType | null>(null);

function readStoredCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  // stops the first (empty) render from wiping the saved cart
  const [hydrated, setHydrated] =
    useState(false);

  // LOAD CART
  // There is no cart API yet, so the cart lives in localStorage for guests
  // and logged-in users alike — it survives refreshes and the login redirect.
  useEffect(() => {
    setCart(readStoredCart());
    setHydrated(true);

    // KEEP TABS IN SYNC
    function handleStorage(e: StorageEvent) {
      if (e.key === CART_KEY) setCart(readStoredCart());
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // CHECK AUTH
  useEffect(() => {
    const token =
      localStorage.getItem("auth_token");

    if (!token) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setIsLoggedIn(!!data?.user))
      .catch(() => setIsLoggedIn(false));
  }, []);

  // SAVE CART
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      // storage full / blocked — cart still works for this session
    }
  }, [cart, hydrated]);

  // ADD
  function addToCart(
    product: Product,
    selectedSize: string
  ) {
    setCart((prev) =>
      addItemToCart(prev, product, selectedSize)
    );
  }

  // REMOVE
  function removeFromCart(
    id: number,
    selectedSize: string
  ) {
    setCart((prev) =>
      removeItemFromCart(prev, id, selectedSize)
    );
  }

  // INCREASE
  function increaseQuantity(
    id: number,
    selectedSize: string
  ) {
    setCart((prev) =>
      increaseItemQuantity(prev, id, selectedSize)
    );
  }

  // DECREASE
  function decreaseQuantity(
    id: number,
    selectedSize: string
  ) {
    setCart((prev) =>
      decreaseItemQuantity(prev, id, selectedSize)
    );
  }

  // CLEAR
  function clearCart() {
    setCart([]);
    localStorage.removeItem(CART_KEY);
  }

  // TOTALS
  const totalPrice =
    cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  const totalItems =
    cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalPrice,
        totalItems,
        isLoggedIn,
        hydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );

}

export function useCart() {

  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be inside CartProvider"
    );
  }

  return context;

}
