import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Books } from "@/hooks/useAvailableBooks";
import HttpsServices from "@/services/https-services";
import protectedInstance from "@/services/protected-api-client";
import toast from "react-hot-toast";
import axios from "axios";

export interface ItemId {
  id: string;
  title: string;
  author: string;
  bookCover: string;
  totalPrice: number;
}

export interface CartItem {
  itemId: ItemId;
  quantity: number;
  amount: number;
  id: string;
}

export interface ViewCartResponse {
  message: string;
  status: string;
  data: CartItem[];
  number: number;
  length: number;
}

interface UserProfile {
  name: string;
  email: string;
  picture: string;
}

interface CartStore {
  items: CartItem[];
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  isSyncing: boolean;
  initialSyncComplete: boolean;
  setItems: (items: CartItem[]) => void;
  addItem: (book: Books) => Promise<void>;
  removeItem: (bookId: string, quantity?: number) => Promise<void>;
  updateQuantity: (bookId: string, quantity: number) => Promise<void>;
  updateCartQuantity: (bookId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => Promise<void>;
  setUserProfile: (profile: UserProfile | null) => void;
  setInitialSyncComplete: (complete: boolean) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  syncCart: () => Promise<void>;
}

const httpsServices = new HttpsServices<ViewCartResponse>(
  "/users/view-cart",
  true
);

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isAuthenticated: false,
      userProfile: null,
      isSyncing: false,
      initialSyncComplete: false,

      setItems: (items) => set({ items }),

      addItem: async (book) => {
        const { isAuthenticated, initialSyncComplete, items } = get();

        // Store previous state for rollback
        const previousItems = [...items];

        // Optimistically update UI
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.itemId.id === book.id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.itemId.id === book.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                      amount: item.itemId.totalPrice * (item.quantity + 1),
                    }
                  : item
              ),
            };
          }
          const newItem: CartItem = {
            itemId: {
              id: book.id,
              title: book.title,
              author: book.author,
              bookCover: book.bookCover,
              totalPrice: book.totalPrice,
            },
            quantity: 1,
            amount: book.totalPrice,
            id: book.id,
          };
          return { items: [...state.items, newItem] };
        });

        if (isAuthenticated && initialSyncComplete) {
          try {
            await protectedInstance.post(`/books/addtocart/${book.id}`, {
              quantity: 1,
            });
            await get().syncCart();
          } catch (error) {
            console.error("Failed to add item to cart:", error);
            set({ items: previousItems });
            toast.error("Failed to add item to cart");
          }
        }
      },

      removeItem: async (bookId, quantity?: number) => {
        const { isAuthenticated, initialSyncComplete, items } = get();
        const previousItems = [...items];

        // Optimistically update UI
        set((state) => ({
          items: state.items.filter((item) => item.itemId.id !== bookId),
        }));

        if (isAuthenticated && initialSyncComplete) {
          try {
            const endpoint =
              quantity !== undefined
                ? `/users/update-cart?itemId=${bookId}&quantity=${quantity}`
                : `/users/update-cart?itemId=${bookId}`;
            await protectedInstance.patch(endpoint);
            await get().syncCart();
          } catch (error) {
            console.error("Failed to remove item from cart:", error);
            set({ items: previousItems });

            if (axios.isAxiosError(error)) {
              const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Failed to remove item from cart";
              toast.error(errorMessage);
            } else {
              toast.error("Failed to remove item from cart");
            }
          }
        }
      },

      updateQuantity: async (bookId, newQuantity) => {
        const { isAuthenticated, initialSyncComplete, items } = get();
        const previousItems = [...items];

        // Optimistically update UI
        set((state) => ({
          items: state.items
            .map((item) =>
              item.itemId.id === bookId
                ? {
                    ...item,
                    quantity: newQuantity,
                    amount: item.itemId.totalPrice * newQuantity,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));

        if (isAuthenticated && initialSyncComplete) {
          try {
            const currentItem = previousItems.find(
              (item) => item.itemId.id === bookId
            );
            if (!currentItem) return;

            if (newQuantity > currentItem.quantity) {
              const quantityToAdd = newQuantity - currentItem.quantity;
              await protectedInstance.post(`/books/addtocart/${bookId}`, {
                quantity: quantityToAdd,
              });
            } else {
              const quantityToRemove = currentItem.quantity - newQuantity;
              for (let i = 0; i < quantityToRemove; i++) {
                await protectedInstance.patch(
                  `/users/update-cart?itemId=${bookId}`
                );
              }
            }
            await get().syncCart();
          } catch (error) {
            console.error("Failed to update item quantity:", error);
            set({ items: previousItems });
            toast.error("Failed to update quantity");
          }
        }
      },

      updateCartQuantity: async (bookId: string, newQuantity: number) => {
        const { isAuthenticated, initialSyncComplete, items } = get();
        const previousItems = [...items];

        // Input validation
        if (newQuantity <= 0) {
          toast.error("Quantity must be greater than 0");
          return;
        }

        // Optimistically update UI for both authenticated and unauthenticated users
        set((state) => ({
          items: state.items.map((item) =>
            item.itemId.id === bookId
              ? {
                  ...item,
                  quantity: newQuantity,
                  amount: item.itemId.totalPrice * newQuantity,
                }
              : item
          ),
        }));

        // Only proceed with API call if user is authenticated
        if (isAuthenticated && initialSyncComplete) {
          try {
            await protectedInstance.post(
              `/users/update-cart?itemId=${bookId}&quantity=${newQuantity}&bookId=${bookId}`
            );
            await get().syncCart();
          } catch (error) {
            console.error("Failed to update cart quantity:", error);
            set({ items: previousItems }); // Rollback to previous state

            if (axios.isAxiosError(error)) {
              const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "An error occurred";
              toast.error(errorMessage);
            } else {
              toast.error("Failed to update quantity");
            }
          }
        }
      },

      clearCart: () => set({ items: [] }),

      setIsAuthenticated: async (isAuthenticated) => {
        const { items, initialSyncComplete } = get();
      
        if (!isAuthenticated) {
          set({
            isAuthenticated,
            items: [],
            initialSyncComplete: false,
          });
          return;
        }
      
        if (!initialSyncComplete) {
          set({ isAuthenticated, isSyncing: true });
          try {
            // First, check what's in the backend cart
            const backendCart = await httpsServices.getAll();
            
            if (items.length > 0) {
              // If local storage has items, clear backend cart and use local items
              if (backendCart.data.length > 0) {
                await protectedInstance.delete('/users/update-cart');
              }
              
              // Add local items to backend
              for (const localItem of items) {
                await protectedInstance.post(
                  `/books/addtocart/${localItem.itemId.id}`,
                  { quantity: localItem.quantity }
                );
              }
              
              // Get final state after adding local items
              const finalCart = await httpsServices.getAll();
              set({
                items: finalCart.data,
                isSyncing: false,
                initialSyncComplete: true,
              });
            } else {
              // If local storage is empty but backend has items, use backend cart
              set({
                items: backendCart.data,
                isSyncing: false,
                initialSyncComplete: true,
              });
            }
          } catch (error) {
            console.error("Failed to sync carts:", error);
            if (axios.isAxiosError(error)) {
              const errorMessage = 
                error.response?.data?.message || 
                error.message || 
                "Failed to sync cart with server";
              toast.error(errorMessage);
            } else {
              toast.error("Failed to sync cart with server");
            }
            set({
              isSyncing: false,
              items: [],
            });
          }
        } else {
          set({ isAuthenticated });
        }
      },

      setUserProfile: (profile) => set({ userProfile: profile }),

      setInitialSyncComplete: (complete) =>
        set({ initialSyncComplete: complete }),

      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.amount, 0);
      },

      syncCart: async () => {
        const { isSyncing, initialSyncComplete, isAuthenticated } = get();

        if (!isAuthenticated || isSyncing || !initialSyncComplete) return;

        set({ isSyncing: true });
        try {
          const response = await httpsServices.getAll();
          set({
            items: response.data,
            isSyncing: false,
          });
        } catch (error) {
          console.error("Failed to sync cart with backend:", error);
          set({ isSyncing: false });
          toast.error("Failed to sync cart with server");
        }
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
