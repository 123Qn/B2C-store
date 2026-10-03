import { AppLayout } from "../Layout/AppLayout";
import { ProductList } from "./List";
import type { Product } from "@prisma/client";
import { productStyles as s } from "@/styles/product";

type Props = {
  title: string;
  products: Product[];
  eyebrow?: string;
};

export function FilteredProducts({ title, products, eyebrow }: Props) {
  return (
    <AppLayout>
      <div className={s.filteredWrapper}>
        <div className={s.filteredHeader}>
          {eyebrow && <p className={s.filteredEyebrow}>{eyebrow}</p>}
          <h1 className={s.filteredTitle}>{title}</h1>
          {products.length > 0 && (
            <p className={s.filteredCount}>
              {products.length} item{products.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <ProductList products={products} />
      </div>
    </AppLayout>
  );
}
