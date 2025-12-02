"use client";

import Image from "next/image";
import React from "react";
import useBasketStore from "@/app/store/useBasketStore";

export default function BasketPage() {
  // Access everything from Zustand **outside render loops**
  const items = useBasketStore((state) => state.items);
  const addItem = useBasketStore((state) => state.addItem);
  const removeItem = useBasketStore((state) => state.removeItem);

  // Group the items safely
  const groupedItems = React.useMemo(() => {
    const grouped: Record<string, typeof items[0]> = {};

    for (const item of items) {
      if (grouped[item.id]) {
        grouped[item.id].quantity += item.quantity;
      } else {
        grouped[item.id] = { ...item };
      }
    }

    return Object.values(grouped);
  }, [items]);

  // Correct reducer (NO curly braces)
  const totalPrice = React.useMemo(() => {
    return groupedItems.reduce(
      (sum, item) => sum + (item.product.price || 0) * item.quantity,
      0
    );
  }, [groupedItems]);

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Basket 🛒</h1>

      {/* EMPTY BASKET */}
      {groupedItems.length === 0 && (
        <div className="text-center text-gray-500 text-lg py-20">
          Your basket is empty 😕
        </div>
      )}

      {/* ITEMS LIST */}
      <div className="space-y-4">
        {groupedItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg"
          >
            {/* Product Details */}
            <div className="flex items-center gap-4">
              {/* Product Image */}
              {item.product.image?.asset?._ref ? (
                <div className="relative w-16 h-16">
                  <Image
                    src={`https://cdn.sanity.io/images/${
                      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
                    }/production/${item.product.image.asset._ref
                      .replace("image-", "")
                      .replace("-jpg", ".jpg")}`}
                    alt={item.product.name || "Product"}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                  No Img
                </div>
              )}

              {/* Name & Price */}
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm text-gray-500">£{item.product.price}</p>
              </div>
            </div>

            {/* +/- Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeItem(item.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
              >
                -
              </button>

              <span className="w-6 text-center font-medium">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  addItem({
                    id: item.id,
                    product: item.product,
                    quantity: 1,
                  })
                }
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL PRICE */}
      {groupedItems.length > 0 && (
        <div className="mt-10 text-right">
          <h2 className="text-2xl font-bold">
            Total: £{totalPrice.toFixed(2)}
          </h2>
        </div>
      )}
    </div>
  );
}
