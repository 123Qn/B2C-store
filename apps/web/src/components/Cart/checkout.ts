export function savePendingOrder(
  cart: any[],
  totalPrice: number
) {

  const pendingOrder = {

    id: Date.now(),

    items: cart,

    total: totalPrice,

    createdAt:
      new Date().toISOString(),
  };

  localStorage.setItem(

    "pendingOrder",

    JSON.stringify(pendingOrder)
  );
}