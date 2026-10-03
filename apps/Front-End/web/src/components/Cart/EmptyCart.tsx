import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { cartStyles as s } from "@/styles/cart";

export function EmptyCart() {
  return (
    <div className={s.empty}>
      <div className={s.emptyIcon}>
        <ShoppingBagIcon className="h-8 w-8" />
      </div>
      <h2 className={s.emptyTitle}>Your cart is empty</h2>
      <p className={s.emptyDesc}>Looks like you haven’t added anything yet. Explore the collection and find something you love.</p>
      <Link href="/" className={s.emptyBtn}>Browse Products</Link>
    </div>
  );
}
