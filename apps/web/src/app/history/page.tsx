"use client";

import { useEffect, useState } from "react";

type Order = {
  id: number;

  items: any[];

  total: number;

  createdAt: string;
};

export default function HistoryPage() {

  const [orders, setOrders] =
    useState<Order[]>([]);

  useEffect(() => {

    const storedOrders =
      JSON.parse(
        localStorage.getItem("orders") ||
        "[]"
      );

    setOrders(storedOrders);

  }, []);

  return (

    <div className="max-w-6xl mx-auto px-8 py-12">

      <h1 className="text-5xl font-bold mb-10">
        Order History
      </h1>

      {orders.length === 0 ? (

        <div
          className="
            border
            rounded-3xl
            p-20
            text-center
            bg-white
          "
        >

          <div className="text-6xl mb-6">
            📦
          </div>

          <h2 className="text-3xl font-bold mb-4">
            No Orders Yet
          </h2>

          <p className="text-gray-500">
            Your completed orders
            will appear here
          </p>

        </div>

      ) : (

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order.id}
              className="
                bg-white
                border
                rounded-3xl
                p-8
                shadow-sm
              "
            >

              {/* Top */}
              <div className="flex justify-between items-center mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    Order #{order.id}
                  </h2>

                  <p className="text-gray-500 mt-1">

                    {new Date(
                      order.createdAt
                    ).toLocaleString()}

                  </p>

                </div>

                <div className="text-right">

                  <p className="text-gray-500">
                    Total
                  </p>

                  <p className="text-3xl font-bold">
                    ${order.total}
                  </p>

                </div>

              </div>

              {/* Items */}
              <div className="space-y-4">

                {order.items.map((item) => (

                  <div
                    key={
                      item.id +
                      item.selectedSize
                    }
                    className="
                      flex
                      justify-between
                      items-center
                      border-t
                      pt-4
                    "
                  >

                    <div className="flex items-center gap-4">

                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="
                          w-20
                          h-20
                          object-cover
                          rounded-xl
                        "
                      />

                      <div>

                        <h3 className="font-semibold text-lg">
                          {item.name}
                        </h3>

                        <p className="text-gray-500 text-sm">
                          Size:
                          {" "}
                          {item.selectedSize}
                        </p>

                        <p className="text-gray-500 text-sm">
                          Quantity:
                          {" "}
                          {item.quantity}
                        </p>

                      </div>

                    </div>

                    <div className="text-right">

                      <p className="font-bold text-xl">
                        $
                        {item.price *
                          item.quantity}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}