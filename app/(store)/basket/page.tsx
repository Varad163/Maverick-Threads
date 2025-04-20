'use client'

import { useBasketStore } from '@/app/(store)/useBasketStore'

export default function BasketPage() {
    const items = useBasketStore((state) => state.items)
    const addItem = useBasketStore((state) => state.addItem)
    const removeItem = useBasketStore((state) => state.removeItem)

    const totalPrice = items.reduce((total, item) => total + item.price * (item.quantity ?? 1), 0)

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">🧺 Your Basket</h1>

            {items.length === 0 ? (
                <p className="text-gray-600">Your basket is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {items.map(({ id, price, quantity }) => (
                        <li
                            key={id}
                            className="border p-4 rounded-xl flex items-center justify-between bg-white shadow"
                        >
                            <div>
                                <p className="font-medium text-lg">🛒 ID: {id}</p>
                                <p className="text-gray-600">Price: ₹{price}</p>
                                <p className="text-gray-600">Quantity: {quantity}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => addItem({ id, price })}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                >
                                    ➕
                                </button>
                                <button
                                    onClick={() => removeItem(id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    ➖
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-6 text-xl font-bold text-right">
                Total: <span className="text-green-600">₹{totalPrice.toFixed(2)}</span>
            </div>

            {/* Test button to add a sample item */}
            <button
                className="mt-6 block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 mx-auto"
                onClick={() => addItem({ id: 'sample123', price: 199 })}
            >
                ➕ Add Sample Item
            </button>
        </div>
    )
}
