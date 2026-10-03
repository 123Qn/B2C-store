import type { Product }
from "@prisma/client";

export type CartItem =
  Product & {

    quantity: number;

    selectedSize: string;

  };

export type CartContextType = {

  cart: CartItem[];

  addToCart: (
    product: Product,
    selectedSize: string
  ) => void;

  removeFromCart: (
    id: number,
    selectedSize: string
  ) => void;

  increaseQuantity: (
    id: number,
    selectedSize: string
  ) => void;

  decreaseQuantity: (
    id: number,
    selectedSize: string
  ) => void;

  clearCart: () => void;

  totalPrice: number;

  totalItems: number;

  isLoggedIn: boolean;

  // true once the saved cart has been read from storage
  hydrated: boolean;
};