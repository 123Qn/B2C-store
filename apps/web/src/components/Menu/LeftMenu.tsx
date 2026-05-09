import Link from "next/link";
import { products } from "@repo/db/data";

export async function LeftMenu() {

  // Unique categories
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // Unique brands
  const brands = [
    ...new Set(products.map((product) => product.brand)),
  ];

  return (
    <div className="w-64 p-6 bg-[#E9B63B] h-full border-r border-gray-200">

      <nav>
        <ul className="flex flex-col gap-8">

          {/* Categories */}
          <li>
            <h1 className="text-xl font-bold mb-4">
              Categories
            </h1>

            <div className="flex flex-col gap-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="text-[#295F98] hover:text-black transition"
                >
                  {category}
                </Link>
              ))}
            </div>
          </li>
          {/* Price */}
          <li>
            <h1 className="text-xl font-bold mb-4">
              Price
            </h1>

            <div className="flex flex-col gap-3">

              <Link
                href="/price/under-50"
                className="text-[#295F98] hover:text-black transition"
              >
                Under $50
              </Link>

              <Link
                href="/price/50-100"
                className="text-[#295F98] hover:text-black transition"
              >
                $50 - $100
              </Link>

              <Link
                href="/price/100-200"
                className="text-[#295F98] hover:text-black transition"
              >
                $100 - $200
              </Link>

              <Link
                href="/price/200-plus"
                className="text-[#295F98] hover:text-black transition"
              >
                $200+
              </Link>

            </div>
          </li>
          {/* Brands */}
          <li>
            <h1 className="text-xl font-bold mb-4">
              Brands
            </h1>

            <div className="flex flex-col gap-3">
              {brands.map((brand) => (
                <Link
                  key={brand}
                  href={`/brand/${brand.toLowerCase()}`}
                  className="text-[#295F98] hover:text-black transition"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </li>

          {/* Admin */}
          <li>
            <Link
              href="http://localhost:3002"
              className="font-semibold text-red-500 hover:text-red-700"
            >
              Admin Dashboard
            </Link>
          </li>

        </ul>
      </nav>

    </div>
  );
}