'use client';
// /app/(store)/useBasketStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/sanity.types';

export interface BasketItem {
    id: string;
    product: Product;
    quantity: number;
}

export interface GroupedItem {
    id: string;
    product: Product;
    quantity: number;
}

interface BasketStore {
    items: BasketItem[];
    addItem: (item: BasketItem) => void;
    removeItem: (id: string) => void;
    getGroupedItems: () => GroupedItem[];
}

const useBasketStore = create<BasketStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const items = get().items;
                const existingItem = items.find((i) => i.id === item.id);
                if (existingItem) {
                    set({
                        items: items.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                    });
                } else {
                    set({ items: [...items, item] });
                }
            },
            removeItem: (id) => {
                const items = get().items;
                const updatedItems = items
                    .map((item) =>
                        item.id === id && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                    .filter((item) => item.quantity > 0);
                set({ items: updatedItems });
            },
            getGroupedItems: () => {
                const items = get().items;
                const grouped: Record<string, GroupedItem> = {};
                for (const item of items) {
                    if (grouped[item.id]) {
                        grouped[item.id].quantity += item.quantity;
                    } else {
                        grouped[item.id] = { ...item };
                    }
                }
                return Object.values(grouped);
            },
        }),
        { name: 'basket-store' } // Enable localStorage persistence
    )
);

export default useBasketStore;
