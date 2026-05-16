"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

import type { Product } from "@prisma/client";

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

const CartContext =
  createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] =
    useState<CartItem[]>([]);

  // ADD
  function addToCart(
    product: Product,
    selectedSize: string
  ) {
    setCart((prev) =>
      addItemToCart(
        prev,
        product,
        selectedSize
      )
    );
  }

  // REMOVE
  function removeFromCart(
    id: number,
    selectedSize: string
  ) {
    setCart((prev) =>
      removeItemFromCart(
        prev,
        id,
        selectedSize
      )
    );
  }

  // INCREASE
  function increaseQuantity(
    id: number,
    selectedSize: string
  ) {
    setCart((prev) =>
      increaseItemQuantity(
        prev,
        id,
        selectedSize
      )
    );
  }

  // DECREASE
  function decreaseQuantity(
    id: number,
    selectedSize: string
  ) {
    setCart((prev) =>
      decreaseItemQuantity(
        prev,
        id,
        selectedSize
      )
    );
  }

  // CLEAR
  function clearCart() {
    setCart([]);
  }

  // TOTAL
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
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