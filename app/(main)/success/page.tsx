"use client";

import { useSearchParams, useRouter } from "next/navigation";
import useBasketStore from "@/app/store/useBasketStore";
import Image from "next/image";
import Confetti from "react-confetti";
import React from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("order_id");
  const orders = useBasketStore((state) => state.orders);

  const order = orders.find((o) => o.id === orderId);

  // Confetti size
  const [dimensions, setDimensions] = React.useState({
    width: 1200,
    height: 800,
  });

  React.useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  // If no order found
  if (!orderId || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4">Order not found ❌</h1>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          We couldn’t find any order for this link. Please try again.
        </p>

        <button
          onClick={() => router.push("/")}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Go back Home
        </button>
      </div>
    );
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;

  return (
    <>
      {/* 🎉 Confetti blast */}
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={350}
        recycle={false}
        gravity={0.3}
      />

      <div className="min-h-screen flex flex-col items-center p-8">
        <div className="max-w-xl w-full bg-white shadow-lg rounded-xl p-6 relative z-10">
          <h1 className="text-3xl font-bold mb-3 text-green-600">
            Payment Successful 🎉
          </h1>

          <p className="text-gray-600 mb-4">
            Your order has been placed successfully!
          </p>

          {/* Order meta */}
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Order ID:{" "}
              <span className="font-mono">{order.id.slice(0, 8)}...</span>
            </p>
            <p className="text-sm text-gray-500">
              Date:{" "}
              {new Date(order.createdAt).toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>

          {/* Items */}
          <div className="border-t pt-4 mt-2 space-y-3">
            {order.items.map((item) => {
              const imageRef = item.product.image?.asset?._ref;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3">
                    {/* ✅ Safe image rendering */}
                    {imageRef ? (
                      <div className="relative w-10 h-10">
                        <Image
                          src={`https://cdn.sanity.io/images/${projectId}/production/${imageRef
                            .replace("image-", "")
                            .replace("-jpg", ".jpg")}`}
                          alt={item.product.name || "Product"}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-[10px] text-gray-500">
                        No Img
                      </div>
                    )}

                    <div>
                      <p className="font-medium">
                        {item.product.name || "Unknown Product"}
                      </p>
                      <p className="text-gray-500 text-xs">
                        £{(item.product.price || 0).toFixed(2)} ×{" "}
                        {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">
                    £{((item.product.price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="border-t mt-4 pt-4 flex items-center justify-between">
            <span className="font-semibold text-lg">Total Paid</span>
            <span className="font-bold text-xl">
              £{order.total.toFixed(2)}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => router.push("/orders")}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
            >
              View My Orders
            </button>

            <button
              onClick={() => router.push("/")}
              className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
