type Props = {
  item: any;
  removeFromCart: any;
  increaseQuantity: any;
  decreaseQuantity: any;
};

export function CartItemCard({
  item,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}: Props) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border flex items-center gap-6">
      {/* IMAGE */}
      <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* INFO */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold">
          {item.name}
        </h2>

        <div className="mt-3">
          <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
            Size: {item.selectedSize}
          </span>
        </div>

        <p className="text-xl font-bold mt-4">
          ${item.price}
        </p>
      </div>

      {/* QUANTITY */}
      <div className="flex items-center bg-gray-100 rounded-2xl overflow-hidden">
        <button
          onClick={() =>
            decreaseQuantity(
              item.id,
              item.selectedSize
            )
          }
          className="w-12 h-12"
        >
          -
        </button>

        <span className="w-12 text-center">
          {item.quantity}
        </span>

        <button
          onClick={() =>
            increaseQuantity(
              item.id,
              item.selectedSize
            )
          }
          className="w-12 h-12"
        >
          +
        </button>
      </div>

      {/* TOTAL */}
      <div className="text-right min-w-[120px]">
        <p className="text-2xl font-bold">
          ${item.price * item.quantity}
        </p>
      </div>

      {/* REMOVE */}
      <button
        onClick={() =>
          removeFromCart(
            item.id,
            item.selectedSize
          )
        }
        className="text-red-500 text-xl"
      >
        ✕
      </button>
    </div>
  );
}