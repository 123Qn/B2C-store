
import { cartStyles as s } from "@/styles/cart";
type Props = {
  totalPrice: number;
  handleCheckout: () => void;
};



export function CartSummary({ totalPrice, handleCheckout }: Props) {
  return (
    <div className={s.summary}>
      <h2 className={s.summaryTitle}>Order Summary</h2>
      <div className={s.summaryRows}>
        <div className={s.summaryRow}>
          <span>Subtotal</span>
          <span>${totalPrice}</span>
        </div>
        <div className={s.summaryRow}>
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className={s.summaryDivider}>
          <span className={s.summaryTotalLabel}>Total</span>
          <span className={s.summaryTotalPrice}>${totalPrice}</span>
        </div>
      </div>
      <button type="button" onClick={handleCheckout} className={s.checkoutBtn}>
        Proceed To Checkout
      </button>
    </div>
  );
}