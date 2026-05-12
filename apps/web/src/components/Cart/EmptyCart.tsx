import Link from "next/link";

export function EmptyCart() {

  return (

    <div
      className="
        flex flex-col
        items-center
        justify-center
        py-32
        border
        rounded-3xl
        bg-white
      "
    >

      <div className="text-7xl mb-6">
        🛒
      </div>

      <h2 className="text-3xl font-bold mb-3">
        Your cart is empty
      </h2>

      <p className="text-gray-500 mb-8">
        Add some products to continue shopping
      </p>

      <Link
        href="/"
        className="
          px-8
          py-4
          bg-black
          text-white
          rounded-2xl
        "
      >
        Browse Products
      </Link>

    </div>
  );
}