import { AppLayout } from "../Layout/AppLayout";

import {ProductList} from "./List";

import type { Product }
from "@prisma/client";

export function FilteredProducts({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {

  return (

    <AppLayout>

      <div className="p-6">

        <h1
          className="
            text-4xl
            font-bold
            mb-8
            capitalize
          "
        >
          {title}
        </h1>

        <ProductList
          products={products}
        />

      </div>

    </AppLayout>

  );

}