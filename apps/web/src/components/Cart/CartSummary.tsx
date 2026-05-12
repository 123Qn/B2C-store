type Props = {
  totalPrice: number;

  handleCheckout: () => void;
};

export function CartSummary({
  totalPrice,
  handleCheckout,
}: Props) {

  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow-sm
        border
        p-8
        sticky
        top-10
      "
    >

      <h2 className="text-3xl font-bold mb-8">
        Order Summary
      </h2>

      <div className="space-y-5 mb-8">

        <div className="flex justify-between">

          <span>Subtotal</span>

          <span>
            ${totalPrice}
          </span>

        </div>

        <div className="flex justify-between">

          <span>Shipping</span>

          <span>Free</span>

        </div>

        <div className="border-t pt-5 flex justify-between">

          <span className="text-xl font-semibold">
            Total
          </span>

          <span className="text-3xl font-bold">
            ${totalPrice}
          </span>

        </div>

      </div>

      <button
        onClick={handleCheckout}
        className="
          w-full
          py-4
          bg-black
          text-white
          rounded-2xl
        "
      >
        Proceed To Checkout
      </button>

    </div>
  );
}