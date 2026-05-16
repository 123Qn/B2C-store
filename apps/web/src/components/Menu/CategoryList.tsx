import Link from "next/link";

import { client } from "@repo/db/client";

export async function CategoryList() {

  const products = await client.db.product.findMany();

  const categories = [
    ...new Set(
      products.map((product) => product.category)
    ),
  ];

  return (

    <div className="flex flex-col gap-3">

      {categories.map((category) => (

        <Link
          key={category}
          href={`/category/${category.toLowerCase()}`}
          className="
            text-gray-700
            hover:text-black
            transition
          "
        >
          {category}
        </Link>

      ))}

    </div>

  );

}