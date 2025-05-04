import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "@/stores/cartStore";

export const useViewCart = () => {
  const { syncCart, isAuthenticated, initialSyncComplete, isSyncing } =
    useCartStore();

  return useQuery({
    queryKey: ["view_cart"],
    queryFn: syncCart,
    enabled: isAuthenticated && initialSyncComplete && !isSyncing,
    onError: (error) => {
      console.error("Cart sync failed:", error);
    },
    retry: 3,
    retryDelay: 1000,
    staleTime: 30000, // Optional: Prevent unnecessary refetches
  });
};
