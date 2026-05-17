import { CategoryList } from "./CategoryList";
import { BrandList } from "./BrandList";
import { MobileMenu } from "./Mobile";

export async function LeftMenu() {

  return (

    <>

      {/* MOBILE */}
      <MobileMenu>

        <div className="flex flex-col gap-8">

          <div>

            <h1 className="text-lg font-bold mb-4">
              Categories
            </h1>

            <CategoryList />

          </div>

          <div>

            <h1 className="text-lg font-bold mb-4">
              Brands
            </h1>

            <BrandList />

          </div>

        </div>

      </MobileMenu>

      {/* DESKTOP */}
     <div
  className="
    hidden
    lg:block
    w-64
    min-h-screen
    sticky
    top-0
    bg-[#B89B8A]
    border-r
    border-gray-200
    p-6
  "
>

        <div className="flex flex-col gap-8">

          <div>

            <h1 className="text-xl font-bold mb-4">
              Categories
            </h1>

            <CategoryList />

          </div>

          <div>

            <h1 className="text-xl font-bold mb-4">
              Brands
            </h1>

            <BrandList />

          </div>

        </div>

      </div>

    </>

  );

}