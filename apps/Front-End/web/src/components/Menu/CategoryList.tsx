import Link from "next/link";
import { client } from "@repo/db/client";
import { leftMenuStyles as s } from "@/styles/leftMenu";

export async function CategoryList() {
  const products = await client.db.product.findMany();
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className={s.categoryList}>
      {categories.map((category) => (
        <Link key={category} href={`/category/${category.toLowerCase()}`} className={s.categoryLink}>
          {category}
        </Link>
      ))}
    </div>
  );
}