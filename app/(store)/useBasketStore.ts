// store/basket.ts

import { create } from 'zustand'

type Item = {
    id: string
    price: number
    quantity?: number
}

type BasketState = {
    items: Item[]
    addItem: (item: Item) => void
    removeItem: (id: string) => void
}

export const useBasketStore = create<BasketState>((set) => ({
    items: [],
    addItem: (item) =>
        set((state) => {
            const existing = state.items.find((i) => i.id === item.id)
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.id === item.id ? { ...i, quantity: (i.quantity ?? 1) + 1 } : i
                    ),
                }
            }
            return {
                items: [...state.items, { ...item, quantity: 1 }],
            }
        }),
    removeItem: (id) =>
        set((state) => ({
            items: state.items
                .map((i) =>
                    i.id === id ? { ...i, quantity: (i.quantity ?? 1) - 1 } : i
                )
                .filter((i) => i.quantity && i.quantity > 0),
        })),
}))
