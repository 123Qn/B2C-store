import type { CartItem } from "./types";
import type { Product } from "@repo/db/data";

// ADD
export function addItemToCart(prev: CartItem[], product: Product, selectedSize: string) {

    const existing = prev.find(
        (item) => (item.id === product.id) && (item.selectedSize === selectedSize)
    );

    // already exists
    if (existing) {

        return prev.map((item) => (item.id === product.id) && (item.selectedSize === selectedSize)

            ? {
                ...item, quantity: item.quantity + 1,
            }
            : item
        );
    }

    // new item
    return [...prev,
    {
        ...product, quantity: 1, selectedSize,
    },
    ];
}

// REMOVE
export function removeItemFromCart(prev: CartItem[], id: number, selectedSize: string) {

    return prev.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize)
    );
}

// INCREASE
export function increaseItemQuantity(prev: CartItem[], id: number, selectedSize: string) {

    return prev.map((item) => item.id === id && item.selectedSize === selectedSize

        ? {
            ...item, quantity: item.quantity + 1,
        }
        : item
    );
}

// DECREASE
export function decreaseItemQuantity(prev: CartItem[], id: number, selectedSize: string) {

    return prev
        .map((item) => item.id === id && item.selectedSize === selectedSize

            ? {
                ...item, quantity: item.quantity - 1,
            }
            : item
        )

        .filter(
            (item) => item.quantity > 0
        );
}