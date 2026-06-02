import Link from "next/link";
import type { Product } from "@prisma/client";
import { searchStyles as s } from "@/styles/search";

export function SearchPopup({ products }: { products: Product[] }) {

  if (products.length === 0) {
    return <div className={s.empty}>No products found</div>;
  }

  return (
    <div className={s.popup}>
      <h2 className={s.title}>Product Results</h2>
      <div className={s.list}>
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.urlId}`} className={s.item}>
            <img src={product.imageUrl} alt={product.name} className={s.itemImage} />
            <div>
              <h3 className={s.itemName}>{product.name}</h3>
              <p className={s.itemPrice}>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}