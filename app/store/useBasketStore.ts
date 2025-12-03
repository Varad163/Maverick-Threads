"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/sanity.types";

export interface BasketItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;           // order id
  createdAt: string;    // ISO date
  total: number;        // total price
  items: OrderItem[];
}

interface BasketStore {
  items: BasketItem[];
  orders: Order[];

  addItem: (item: BasketItem) => void;
  removeItem: (id: string) => void;
  clearBasket: () => void;

  addOrder: (order: Order) => void;
}

const useBasketStore = create<BasketStore>()(
  persist(
    (set, get) => ({
      items: [],
      orders: [],

      addItem: (item) => {
        const items = get().items;
        const existing = items.find((i) => i.id === item.id);

        if (existing) {
          set({
            items: items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
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

      clearBasket: () => set({ items: [] }),

      addOrder: (order) => {
        const orders = get().orders;
        set({ orders: [order, ...orders] }); // newest first
      },
    }),
    {
      name: "basket-store", // localStorage key
    }
  )
);

export default useBasketStore;
