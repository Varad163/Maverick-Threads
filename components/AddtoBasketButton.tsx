'use client';

import { Product } from "@/sanity.types";
import useBasketStore from "@/app/store/useBasketStore";   // ✅ Correct import
import React from "react";

interface AddToBasketProps {
    product: Product;
    disabled?: boolean;
}

const AddToBasketButton: React.FC<AddToBasketProps> = ({ product, disabled = false }) => {
    const addItem = useBasketStore((state) => state.addItem);
    const removeItem = useBasketStore((state) => state.removeItem);

    // Get item count from Zustand store
    const itemCount = useBasketStore((state) =>
        state.items.find((item) => item.id === product._id)?.quantity || 0
    );

    const handleAdd = () => {
        addItem({
            id: product._id,
            product: product,   // ✅ Store full product
            quantity: 1,
        });
    };

    const handleRemove = () => {
        removeItem(product._id);
    };

    return (
        <div className="flex items-center space-x-2">
            {/* Minus Button */}
            <button
                onClick={handleRemove}
                disabled={itemCount === 0 || disabled}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    itemCount === 0 || disabled
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
                −
            </button>

            {/* Count Display */}
            <span className="w-8 text-center font-medium text-gray-700">{itemCount}</span>

            {/* Plus Button */}
            <button
                onClick={handleAdd}
                disabled={disabled}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    disabled
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
                +
            </button>
        </div>
    );
};

export default AddToBasketButton;
