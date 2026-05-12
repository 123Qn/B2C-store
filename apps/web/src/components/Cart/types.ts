import type { Product }
from "@repo/db/data";

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
};