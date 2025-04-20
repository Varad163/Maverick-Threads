// BasketPage.tsx
'use client'
import React from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { create } from 'zustand'

// Zustand store
interface BasketState {
    groupedItems: Record<string, { id: string; price: number; quantity: number }>
    totalPrice: number
    addItem: (item: { id: string; price: number }) => void
    removeItem: (itemId: string) => void
}

const useBasketStore = create<BasketState>((set) => ({
    groupedItems: {},
    totalPrice: 0,
    addItem: (item: { id: string; price: number }) =>
        set((state) => {
            const updated = { ...state.groupedItems }
            if (updated[item.id]) {
                updated[item.id].quantity += 1
            } else {
                updated[item.id] = { ...item, quantity: 1 }
            }
            return {
                groupedItems: updated,
                totalPrice: state.totalPrice + item.price,
            }
        }),
    removeItem: (itemId) =>
        set((state) => {
            const updated = { ...state.groupedItems }
            const item = updated[itemId]
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1
                } else {
                    delete updated[itemId]
                }
                return {
                    groupedItems: updated,
                    totalPrice: state.totalPrice - item.price,
                }
            }
            return state
        }),
}))

// Main component
const BasketPage = () => {
    const groupedItems = useBasketStore((state) => state.groupedItems)
    const totalPrice = useBasketStore((state) => state.totalPrice)

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-4">🛒 Your Basket</h1>

                {Object.keys(groupedItems).length === 0 ? (
                    <p className="text-gray-600">Your basket is empty.</p>
                ) : (
                    <ul className="space-y-4">
                        {Object.entries(groupedItems).map(([id, item]) => (
                            <li
                                key={id}
                                className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm"
                            >
                                <div>
                                    <p className="font-medium">Item ID: {id}</p>
                                    <p className="text-sm text-gray-500">
                                        ₹{item.price.toFixed(2)} × {item.quantity}
                                    </p>
                                </div>
                                <div className="text-right font-semibold">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-6 border-t pt-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Total:</h2>
                    <span className="text-xl font-bold text-green-600">
                        ₹{totalPrice.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default BasketPage
