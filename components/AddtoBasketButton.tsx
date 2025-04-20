'use client';

import { Button } from "@/components/ui/button";
import { Product } from "@/sanity.types";
import { useBasketStore } from "@/app/(store)/useBasketStore";
import React from "react";

interface AddtoBasketProps {
    product: Product;
    disabled: boolean;
}

const AddtoBasketButton: React.FC<AddtoBasketProps> = ({ product, disabled }) => {
    const addItem = useBasketStore((state) => state.addItem);
    const removeItem = useBasketStore((state) => state.removeItem);

    // ✅ Dynamically get item count from store
    const itemCount = useBasketStore((state) =>
        state.items.find((item) => item.id === product._id)?.quantity || 0
    );

    return (
        <div className="flex items-center justify-between space-x-2">
            {/* Minus */}
            <button
                onClick={() => removeItem(product._id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${itemCount === 0 || disabled
                        ? "bg-gray-100 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                disabled={itemCount === 0 || disabled}
            >
                <span
                    className={`text-xl font-bold ${itemCount === 0 || disabled ? "text-gray-400" : "text-gray-600"
                        }`}
                >
                    −
                </span>
            </button>

            {/* Count */}
            <span className="w-8 text-center font-semibold text-gray-700">
                {itemCount}
            </span>

            {/* Plus */}
            <button
                onClick={() => addItem({ id: product._id, price: product.price ?? 0 })}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${disabled
                        ? "bg-gray-100 cursor-not-allowed"
                        : "bg-gray-500 hover:bg-gray-600"
                    }`}
                disabled={disabled}
            >
                <span className="text-white font-bold">+</span>
            </button>
        </div>
    );
};

export default AddtoBasketButton;
