import Link from "next/link";

async function getOrders() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/all`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
    <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700 transition">← Back to Dashboard</Link>
      <h1 className="text-4xl font-bold mb-2">Orders</h1>
      <p className="text-gray-500 mb-8">All purchase records</p>

      <div className="flex flex-col gap-4">
        {orders.map((order: any) => (
          <div key={order.id} className="bg-white rounded-2xl p-6 shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-bold">Order #{order.id}</h2>
                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600 mt-1">👤 {order.user.email}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase">Total</p>
                <p className="text-2xl font-bold">${order.totalPrice}</p>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">{order.status}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Size: {item.size} × {item.quantity}</p>
                  </div>
                  <p className="font-bold text-sm">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}