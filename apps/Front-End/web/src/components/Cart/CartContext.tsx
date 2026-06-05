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

const CartContext =
  createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [status, setStatus] =
    useState<"loading" | "done">("loading");

  // CHECK AUTH
  useEffect(() => {

    const token =
      localStorage.getItem("auth_token");

    if (!token) {
      setStatus("done");
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) =>
        res.ok ? res.json() : null
      )
      .then((data) => {
        setIsLoggedIn(!!data?.user);
      })
      .catch(() => {
        setIsLoggedIn(false);
      })
      .finally(() => {
        setStatus("done");
      });

  }, []);

  // LOAD CART
  useEffect(() => {

    if (status === "loading") return;

    if (isLoggedIn) {

      // TODO: fetch cart from DB
      // const token = localStorage.getItem("auth_token");
      // const dbCart = await fetchCartFromDB(token)
      // setCart(dbCart)

      // MERGE GUEST CART
      const guestCart =
        localStorage.getItem("cart");

      if (guestCart) {

        const parsed: CartItem[] =
          JSON.parse(guestCart);

        if (parsed.length > 0) {

          setCart((prev) =>
            mergeGuestCart(prev, parsed)
          );

          localStorage.removeItem("cart");

        }

      }

    } else {

      const savedCart =
        localStorage.getItem("cart");

      if (savedCart) {

        setCart(
          JSON.parse(savedCart)
        );

      }

    }

  }, [status, isLoggedIn]);

  // SAVE CART
  useEffect(() => {

    if (status === "loading") return;

    if (isLoggedIn) {

      // TODO: sync cart to DB
      // const token = localStorage.getItem("auth_token");
      // syncCartToDB(token, cart)

    } else {

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

    }

  }, [cart, isLoggedIn, status]);

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

    localStorage.removeItem("cart");

  }

  // TOTAL
  const totalPrice =
    cart.reduce(
      (total, item) =>

        total +
        item.price *
        item.quantity,

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

        isLoggedIn,

      }}
    >

      {children}

    </CartContext.Provider>

  );

}

function mergeGuestCart(
  userCart: CartItem[],
  guestCart: CartItem[]
): CartItem[] {

  const merged = [...userCart];

  for (const guestItem of guestCart) {

    const existing = merged.find(
      (i) =>
        i.id === guestItem.id &&
        i.selectedSize === guestItem.selectedSize
    );

    if (existing) {

      existing.quantity += guestItem.quantity;

    } else {

      merged.push(guestItem);

    }

  }

  return merged;

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