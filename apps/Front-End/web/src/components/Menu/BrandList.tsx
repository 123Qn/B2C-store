import Link from "next/link";
import { client } from "@repo/db/client";
import { leftMenuStyles as s } from "@/styles/leftMenu";

export async function BrandList() {
  const products = await client.db.product.findMany();
  const brands = [...new Set(products.map((p) => p.brand))];

  return (
    <div className={s.brandList}>
      {brands.map((brand) => (
        <Link key={brand} href={`/brand/${brand.toLowerCase()}`} className={s.brandLink}>
          {brand}
        </Link>
      ))}
    </div>
  );
}