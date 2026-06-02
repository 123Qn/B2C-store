export async function savePendingOrder(
  cart: any[],
  totalPrice: number
) {
  const pendingOrder = {
    id: Date.now(),
    items: cart,
    total: totalPrice,
    createdAt: new Date().toISOString(),
  };

  await fetch("/api/orders", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      cart,
      totalPrice,
      pendingOrder,
    }),
  });
}