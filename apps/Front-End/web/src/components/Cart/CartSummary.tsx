import { LockClosedIcon } from "@heroicons/react/24/outline";
import { cartStyles as s } from "@/styles/cart";
import { formatPrice } from "@/lib/format";

type Props = {
  totalPrice: number;
  totalItems: number;
  handleCheckout: () => void;
  loading?: boolean;
  error?: string;
};

export function CartSummary({ totalPrice, totalItems, handleCheckout, loading = false, error }: Props) {
  return (
    <div className={s.summary}>
      <h2 className={s.summaryTitle}>Order Summary</h2>
      <div className={s.summaryRows}>
        <div className={s.summaryRow}>
          <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className={s.summaryRow}>
          <span>Shipping</span>
          <span className={s.summaryFree}>Free</span>
        </div>
      </div>
      <div className={s.summaryDivider}>
        <span className={s.summaryTotalLabel}>Total</span>
        <span className={s.summaryTotalPrice}>{formatPrice(totalPrice)}</span>
      </div>

      {error && <p className={s.error} role="alert">{error}</p>}

      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={s.checkoutBtn}
      >
        {loading ? "Placing order…" : "Proceed To Checkout"}
      </button>
      <p className={s.secureNote}>
        <LockClosedIcon className="h-3.5 w-3.5" /> Secure checkout
      </p>
    </div>
  );
}
