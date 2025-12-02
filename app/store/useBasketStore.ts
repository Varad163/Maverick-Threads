"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/sanity.types";

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
        const existing = items.find((i) => i.id === item.id);

        if (existing) {
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

        const updated = items
          .map((i) =>
            i.id === id && i.quantity > 1
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0);

        set({ items: updated });
      },

      getGroupedItems: () => {
        const grouped: Record<string, GroupedItem> = {};

        for (const item of get().items) {
          if (grouped[item.id]) {
            grouped[item.id].quantity += item.quantity;
          } else {
            grouped[item.id] = { ...item };
          }
        }

        return Object.values(grouped);
      },
    }),
    { name: "basket-store" }
  )
);

export default useBasketStore;
