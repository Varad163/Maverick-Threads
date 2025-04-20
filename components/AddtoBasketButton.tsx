'use client';
import { Button } from "@/components/ui/button"; // Make sure the path is correct
import { Product } from "@/sanity.types"; // Assuming you're passing a product prop
import { useBasketStore } from "@/app/(store)/useBasketStore"; // Adjust path as needed
import React from "react";

interface AddtoBasketProps {
    product: Product;
    itemCount: number;
    disabled: boolean;
}

const AddtoBasketButton: React.FC<AddtoBasketProps> = ({ product, itemCount, disabled }) => {
    const addItem = useBasketStore((state) => state.addItem);
    const removeItem = useBasketStore((state) => state.removeItem);

    const handleAddToBasket = () => {
        if (!disabled && product._id && product.price) {
            addItem({ id: product._id, price: product.price });
        }
    };

    return (
        <div className="flex items-center justify-between space-x-2">
            {/* Minus Button */}
            <button
                onClick={() => removeItem(product._id)} // You’ll need to have this function
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

            {/* Count Display */}
            <span className="w-8 text-center font-semibold text-gray-700">
                {itemCount}
            </span>

            {/* Plus Button */}
            <button
                onClick={() =>
                    addItem({ id: product._id, price: product.price ?? 0 })
                }
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
