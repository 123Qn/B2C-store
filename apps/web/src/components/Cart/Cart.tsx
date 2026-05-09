"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

import type { Product } from "@repo/db/data";

type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (product: Product) => void;

  removeFromCart: (id: number) => void;

  increaseQuantity: (id: number) => void;

  decreaseQuantity: (id: number) => void;

  totalPrice: number;
};

const CartContext =
  createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [cart, setCart] = useState<CartItem[]>([]);

  // ADD ITEM
  function addToCart(product: Product) {

    setCart((prev) => {

      const existing = prev.find(
        (item) => item.id === product.id
      );

      // already in cart
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // new item
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  // REMOVE ITEM
  function removeFromCart(id: number) {

    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  // INCREASE
  function increaseQuantity(id: number) {

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  // DECREASE
  function decreaseQuantity(id: number) {

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      ).filter((item) => item.quantity > 0)
    );
  }

  // TOTAL
  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
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

        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {

  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be inside CartProvider"
    );
  }

  return context;
}