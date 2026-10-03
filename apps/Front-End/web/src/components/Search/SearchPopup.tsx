import Link from "next/link";
import type { Product } from "@prisma/client";
import { searchStyles as s } from "@/styles/search";
import { FALLBACK_IMAGE, formatPrice } from "@/lib/format";

type Props = {
  query: string;
  products: Product[];
  total: number;
};

export function SearchPopup({ query, products, total }: Props) {

  if (products.length === 0) {
    return <div className={s.empty}>No products found for “{query}”</div>;
  }

  return (
    <div className={s.popup}>
      <h2 className={s.title}>Product Results</h2>
      <div className={s.list}>
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.urlId}`} className={s.item}>
            <img src={product.imageUrl || FALLBACK_IMAGE} alt={product.name} className={s.itemImage} />
            <div className={s.itemInfo}>
              <h3 className={s.itemName}>{product.name}</h3>
              <p className={s.itemMeta}>{product.brand} · {product.category}</p>
            </div>
            <p className={s.itemPrice}>{formatPrice(product.price)}</p>
          </Link>
        ))}
      </div>
      <Link href={`/search?q=${encodeURIComponent(query)}`} className={s.footer}>
        See all {total} result{total !== 1 ? "s" : ""} →
      </Link>
    </div>
  );
}
