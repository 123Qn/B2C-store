import Link from "next/link";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { cartStyles as s } from "@/styles/cart";
import { FALLBACK_IMAGE, formatPrice } from "@/lib/format";
import type { CartContextType, CartItem } from "./types";

type Props = {
  item: CartItem;
  removeFromCart: CartContextType["removeFromCart"];
  increaseQuantity: CartContextType["increaseQuantity"];
  decreaseQuantity: CartContextType["decreaseQuantity"];
};

export function CartItemCard({ item, removeFromCart, increaseQuantity, decreaseQuantity }: Props) {
  return (
    <div className={s.itemCard}>
      <Link href={`/products/${item.urlId}`} className={s.itemImage}>
        <img src={item.imageUrl || FALLBACK_IMAGE} alt={item.name} className={s.itemImg} />
      </Link>

      <div className={s.itemBody}>
        <div className={s.itemTop}>
          <div className={s.itemInfo}>
            <p className={s.itemBrand}>{item.brand}</p>
            <Link href={`/products/${item.urlId}`}>
              <h2 className={s.itemName}>{item.name}</h2>
            </Link>
            <p className={s.itemPrice}>{formatPrice(item.price)} each</p>
            <span className={s.itemSize}>Size: {item.selectedSize}</span>
          </div>
          <button
            className={s.removeBtn}
            onClick={() => removeFromCart(item.id, item.selectedSize)}
            title="Remove item"
          >
            ✕
          </button>
        </div>

        <div className={s.itemBottom}>
          <div className={s.quantity}>
            <button
              className={s.quantityBtn}
              onClick={() => decreaseQuantity(item.id, item.selectedSize)}
              aria-label="Decrease quantity"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className={s.quantityCount}>{item.quantity}</span>
            <button
              className={s.quantityBtn}
              onClick={() => increaseQuantity(item.id, item.selectedSize)}
              aria-label="Increase quantity"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          <p className={s.itemTotalPrice}>{formatPrice(item.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
}
