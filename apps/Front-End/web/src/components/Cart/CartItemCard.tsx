import { cartStyles as s } from "@/styles/cart";

type Props = {
  item: any;
  removeFromCart: any;
  increaseQuantity: any;
  decreaseQuantity: any;
};
export function CartItemCard({ item, removeFromCart, increaseQuantity, decreaseQuantity }: Props) {
  return (
    <div className={s.itemCard}>
      <div className={s.itemImage}>
        <img src={item.imageUrl} alt={item.name} className={s.itemImg} />
      </div>
      <div className={s.itemInfo}>
        <h2 className={s.itemName}>{item.name}</h2>
        <div className="mt-3">
          <span className={s.itemSize}>Size: {item.selectedSize}</span>
        </div>
        <p className={s.itemPrice}>${item.price}</p>
      </div>
      <div className={s.quantity}>
        <button className={s.quantityBtn} onClick={() => decreaseQuantity(item.id, item.selectedSize)}>-</button>
        <span className={s.quantityCount}>{item.quantity}</span>
        <button className={s.quantityBtn} onClick={() => increaseQuantity(item.id, item.selectedSize)}>+</button>
      </div>
      <div className={s.itemTotal}>
        <p className={s.itemTotalPrice}>${item.price * item.quantity}</p>
      </div>
      <button className={s.removeBtn} onClick={() => removeFromCart(item.id, item.selectedSize)}>✕</button>
    </div>
  );
}