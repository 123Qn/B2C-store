"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

import type { Product } from "@repo/db/data";

type CartItem = Product & {
  quantity: number;
  selectedSize: string;
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (
  product: Product,
  selectedSize: string
) => void;

  removeFromCart: (
  id: number,
  selectedSize: string
) => void;

  increaseQuantity: (id: number, selectedSize: string) => void;

  decreaseQuantity: (id: number, selectedSize: string) => void;

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
  function addToCart(
  product: Product,
  selectedSize: string
) {

  setCart((prev) => {

    const existing = prev.find(
      (item) =>
        item.id === product.id &&
        item.selectedSize === selectedSize
    );

    // already exists
    if (existing) {

      return prev.map((item) =>

        item.id === product.id &&
        item.selectedSize === selectedSize

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
        selectedSize,
      },
    ];
  });
}

  // REMOVE ITEM
  function removeFromCart(
  id: number,
  selectedSize: string
) {

  setCart((prev) =>
    prev.filter(
      (item) => !(
        item.id === id &&
        item.selectedSize === selectedSize
      )
    )
  );
}

  // INCREASE
  function increaseQuantity(id: number, selectedSize: string) {

    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === selectedSize
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  // DECREASE
  function decreaseQuantity(id: number, selectedSize: string) {

    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === selectedSize
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