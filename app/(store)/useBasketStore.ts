import { create } from "zustand";

interface BasketItem {
    id: string;
    price: number;
    quantity: number;
}

interface BasketState {
    groupedItems: Record<string, BasketItem>;
    totalPrice: number;
    addItem: (item: { id: string; price: number }) => void;
    removeItem: (itemId: string) => void;
}

export const useBasketStore = create<BasketState>((set) => ({
    groupedItems: {},
    totalPrice: 0,

    addItem: (item) =>
        set((state) => {
            const updatedGroupedItems = { ...state.groupedItems };

            if (updatedGroupedItems[item.id]) {
                updatedGroupedItems[item.id].quantity += 1;
            } else {
                updatedGroupedItems[item.id] = { ...item, quantity: 1 };
            }

            return {
                groupedItems: updatedGroupedItems,
                totalPrice: state.totalPrice + item.price,
            };
        }),

    removeItem: (itemId) =>
        set((state) => {
            const updatedGroupedItems = { ...state.groupedItems };
            const item = updatedGroupedItems[itemId];

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    delete updatedGroupedItems[itemId];
                }

                return {
                    groupedItems: updatedGroupedItems,
                    totalPrice: state.totalPrice - item.price,
                };
            }

            return state;
        }),
}));
