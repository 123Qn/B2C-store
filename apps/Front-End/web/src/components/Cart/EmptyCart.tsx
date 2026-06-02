import Link from "next/link";
import { cartStyles as s } from "@/styles/cart";

export function EmptyCart() {
  return (
    <div className={s.empty}>
      <div className={s.emptyIcon}>🛒</div>
      <h2 className={s.emptyTitle}>Your cart is empty</h2>
      <p className={s.emptyDesc}>Add some products to continue shopping</p>
      <Link href="/" className={s.emptyBtn}>Browse Products</Link>
    </div>
  );
}