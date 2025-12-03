"use client";

import useBasketStore from "@/app/store/useBasketStore";
import Image from "next/image";

export default function OrdersPage() {
  const orders = useBasketStore((state) => state.orders);

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders 📦</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">
          You don&apos;t have any orders yet. Buy something from your basket!
        </p>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold">
                  Order ID:{" "}
                  <span className="font-mono text-sm">
                    {order.id.slice(0, 8)}...
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString("en-GB")}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg">
                  Total: £{order.total.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  {order.items.length} item
                  {order.items.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {item.product.image?.asset?._ref ? (
                      <div className="relative w-10 h-10">
                        <Image
                          src={`https://cdn.sanity.io/images/${
                            process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
                          }/production/${item.product.image.asset._ref
                            .replace("image-", "")
                            .replace("-jpg", ".jpg")}`}
                          alt={item.product.name || "Product"}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                        No Img
                      </div>
                    )}

                    <div>
                      <p className="font-medium text-sm">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        £{item.product.price?.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold text-sm">
                    £{((item.product.price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
