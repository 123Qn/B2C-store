import Link from "next/link";

export function EmptyCart() {

  return (

    <div className="flex flex-col items-center justify-center py-24 md:py-32 border rounded-3xl bg-white text-center px-6">

      {/* ICON */}
      <div className="text-6xl md:text-7xl mb-6">
        🛒
      </div>

      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl font-bold mb-3">
        Your cart is empty
      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-500 mb-8 max-w-md">
        Add some products to continue shopping
      </p>

      {/* BUTTON */}
      <Link
        href="/"
        className="px-8 py-4 bg-black text-white rounded-2xl hover:bg-gray-800 transition"
      >
        Browse Products
      </Link>

    </div>

  );

}