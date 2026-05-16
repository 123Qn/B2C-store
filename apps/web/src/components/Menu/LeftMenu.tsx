import Link from "next/link";

import { CategoryList } from "./CategoryList";
import { BrandList } from "./BrandList";

export async function LeftMenu() {

  return (

    <div className="w-64 p-6 bg-[#B89B8A] h-full border-r border-gray-200">

      <nav>

        <ul className="flex flex-col gap-8">

          {/* CATEGORIES */}
          <li>

            <h1 className="text-xl font-bold mb-4">
              Categories
            </h1>

            <CategoryList />

          </li>

          {/* PRICE */}
          <li>

            <h1 className="text-xl font-bold mb-4">
              Price
            </h1>

            <div className="flex flex-col gap-3">

              <Link
                href="/price/under-50"
                className="text-[#FFF8F3] hover:text-black transition"
              >
                Under $50
              </Link>

              <Link
                href="/price/From-50-100"
                className="text-[#FFF8F3] hover:text-black transition"
              >
                $50 - $100
              </Link>

              <Link
                href="/price/From-100-200"
                className="text-[#FFF8F3] hover:text-black transition"
              >
                $100 - $200
              </Link>

              <Link
                href="/price/over-200"
                className="text-[#FFF8F3] hover:text-black transition"
              >
                Over $200
              </Link>

            </div>

          </li>

          {/* BRANDS */}
          <li>

            <h1 className="text-xl font-bold mb-4">
              Brands
            </h1>

            <BrandList />

          </li>

        </ul>

      </nav>

    </div>

  );

}