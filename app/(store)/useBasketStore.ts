import { create } from 'zustand';

type Item = {
    id: string;
    name: string;
    quantity: number;
};

export interface GroupedItem {
    id: string;
    quantity: number;
    product: {
        name?: string;
        price?: number;
        image?: {
            asset?: {
                _ref: string;
            };
        };
    };
}

type BasketState = {
    items: Item[];
    addItem: (item: Item) => void;
    removeItem: (id: string) => void;
    clearBasket: () => void;
};

export const useBasketStore = create<BasketState>((set) => ({
    items: [],

    addItem: (item) =>
        set((state) => {
            const existing = state.items.find((i) => i.id === item.id);
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.id === item.id
                            ? { ...i, quantity: i.quantity + item.quantity }
                            : i
                    ),
                };
            }
            return { items: [...state.items, item] };
        }),

    removeItem: (id) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        })),

    clearBasket: () => set({ items: [] }),
}));
