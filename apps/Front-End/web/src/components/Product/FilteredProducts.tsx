import { AppLayout } from "../Layout/AppLayout";
import { ProductList } from "./List";
import type { Product } from "@prisma/client";
import { productStyles as s } from "@/styles/product";

export function FilteredProducts({ title, products }: { title: string; products: Product[] }) {
  return (
    <AppLayout>
      <div className={s.filteredWrapper}>
        <h1 className={s.filteredTitle}>{title}</h1>
        <ProductList products={products} />
      </div>
    </AppLayout>
  );
}